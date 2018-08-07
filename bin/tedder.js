#!/usr/bin/env node

const program = require('commander'),
  gitter = require('simple-git/promise')(),
  Tedder = require('../src/index'),
  pkg = require('../package.json'),
  explorer = require('cosmiconfig')('tedder'),
  chalk = require('chalk');

program
  .version(pkg.version, '-v, --version')
  .option(
    '-b, --base [base]',
    'base branch to branch off - default to origin/master'
  )
  .option('-r, --remote [remote]', 'remote name - default to origin')
  .option('-d, --day [day]', 'specify day -  default to Monday')
  .option('-n, --next [next]', 'specify round, default to 1')
  .option('-t, --template [template]', 'specify template')
  .option(
    '-c, --checkOnly',
    'only checks whether the remote branch exists - default to false'
  )
  .action(options => {
    gitter.checkIsRepo().then(isRepo => {
      if (!isRepo) {
        return console.log(chalk.hex('#cc0000')('😒 NOT a git repo!'));
      }
      const searchedFor = explorer.searchSync();
      const config = (searchedFor && searchedFor.config) || {};
      new Tedder(gitter, {
        ...config, // terminal config take precedence
        ...options,
      }).start();
    });
  })
  .parse(process.argv);
