const { format, log, getDate, bingo, show } = require('./util');

const defaultConfig = {
  remote: 'origin',
  base: 'origin/master',
  checkOnly: false,
  next: 1,
  day: 'Mon',
  template: 'feature/[yyyy][mm][dd]',
};

class Tedder {
  constructor(gitter, config = {}) {
    this.config = {
      ...defaultConfig,
      ...config,
    };
    this.gitter = gitter;
    this._branch = format(this.config.template, this._date);
  }

  get _date() {
    let {
      config: { day, next },
    } = this;
    let now = new Date();
    return getDate(day, next, now);
  }

  async checkRemote() {
    log(`💸 checking remote branch...: ${this._branch}`);
    let { gitter, config } = this;
    let result = await gitter.raw([
      'ls-remote',
      '--heads',
      config.remote,
      this._branch,
    ]);
    let isExists = result != null;
    log(`💸 remote exists: ${isExists ? 'YES' : 'NO'}`);
    return isExists;
  }

  async checkLocal() {
    let { gitter, config } = this;
    let result = await gitter.raw(['show-ref', `refs/heads/${this._branch}`]);
    return result != null;
  }

  async checkout() {
    let { gitter, _branch } = this;
    log('📍 checkout...', 'yellow');
    await gitter.raw(['checkout', _branch]);
    log('📍 checkout done', 'yellow');
  }

  async fetchAndCheckout() {
    let { gitter, _branch } = this;

    log('😈 fetching remote branch', 'cyan');
    await gitter.raw(['fetch']);
    log('😈 fetching remote branch done', 'cyan');

    await this.checkout();
  }

  async switchBranch() {
    let { gitter, _branch, config } = this;
    let exists = await this.checkLocal();
    if (exists) {
      log(`👊 local branch ${_branch} exists, checking out...`, 'red');
      await this.checkout();
    } else {
      log(`👊 creating new branch...: ${_branch}`, 'red');
      await gitter.raw(['checkout', '-b', _branch, config.base]);
      log(`👊 branch ${_branch} created`, 'red');
    }
  }

  async syncToRemote() {
    let { gitter, _branch, config } = this;
    log(`👯 push branch ${_branch} to remote`, 'gray');
    await gitter.raw(['push', '-u', config.remote, _branch]);
    log(`👯 remoted synced`, 'gray');
  }

  async createAndPush() {
    await this.switchBranch();
    await this.syncToRemote();
  }

  async kickoff() {
    let { config, _branch, gitter } = this;
    let isExists = await this.checkRemote();
    if (config.checkOnly) {
      return;
    }
    if (isExists) {
      // remote exists, fetch and then checkout
      return await this.fetchAndCheckout();
    }
    // create new branch and push to remote
    return await this.createAndPush();
  }

  async start() {
    await this.kickoff();
    if (bingo()) {
      show('B I N G O !');
    }
  }
}

module.exports = Tedder;
