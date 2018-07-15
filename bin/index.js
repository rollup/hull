#!/usr/bin/env node

const { join } = require('path');

const chalk = require('chalk');
const execa = require('execa');
const ora = require('ora');

const { log } = console;
const spinner = ora(chalk`{blue ⓡ}  Applying Hull Configuration`).start();
const args = ['mrm', '--dir', join(__dirname, '../.mrm'), 'hull'];

(async () => {
  try {
  	await execa('npx', args);
    spinner.stop();
    log(chalk`{green ⓡ}  Hull Configuration Applied`);
  } catch (error) {
    spinner.stop();
    log(chalk`{red ⓡ}  Hull Configuration Failed`);
  	log(error);
    process.exitCode = error.code;
  }
})();
