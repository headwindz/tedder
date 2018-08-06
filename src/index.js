const { format, log, getDate, bingo, show } = require('./util');

const defaultConfig = {
  remote: 'origin',
  base: 'master',
  checkOnly: false,
  next: 1,
  day: 'Mon',
  template: 'feature/${yyyy}${mm}${dd}',
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

  async fetchAndCheckout() {
    let { gitter, _branch } = this;

    log('😈 fetching remote branch', 'cyan');
    await gitter.raw(['fetch']);
    log('😈 fetching remote branch done', 'cyan');

    log('📍 checkout...', 'yellow');
    await gitter.raw(['checkout', _branch]);
    log('📍 checkout done', 'yellow');
  }

  async createNewBranch() {
    let { gitter, _branch, config } = this;
    log(`👊 creating new branch...: ${_branch}`, 'red');
    await gitter.raw(['checkout', '-b', _branch, config.base]);
    log(`👊 branch ${_branch} created`, 'red');
  }

  async syncToRemote() {
    let { gitter, _branch, config } = this;
    log(`👯 push branch ${_branch} to remote`, 'gray');
    await gitter.raw(['push', '-u', config.remote, _branch]);
    log(`👯 remoted synced`, 'gray');
  }

  async createAndPush() {
    await this.createNewBranch();
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
