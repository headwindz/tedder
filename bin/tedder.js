#!/usr/bin/env node

let program = require('commander'),
  gitter = require('simple-git/promise')(),
  Tedder = require('../src/index'),
  { bingo, show } = require('../src/util'),
  pkg = require('../package.json'),
  chalk = require('chalk');

program
  .version(pkg.version, '-v, --version')
  .option('-b, --base [base]', 'base branch to branch off - default to master')
  .option('-r, --remote [remote]', 'remote name - default to origin')
  .option('-d, --day [day]', 'specify day')
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
      new Tedder(gitter, options).kickoff(() => {
        if (bingo()) {
          show('B I N G O !');
        }
      });
    });
  })
  .parse(process.argv);
