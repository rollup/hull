#!/usr/bin/env node

const { join } = require('path');

const chalk = require('chalk');
const execa = require('execa');
const ora = require('ora');
const strip = require('strip-ansi');

const { log } = console;
const preface = chalk`{blue ⓡ} `;
const spinner = ora(`${preface} Applying Hull Configuration`).start();
const args = ['mrm', '--dir', join(__dirname, '../.mrm'), 'hull'];

(async () => {
  try {
    const proc = execa('npx', args);

    proc.stdout.on('data', (buffer) => {
      const line = strip(buffer.toString()).trim();
      spinner.text = `${preface} ${line}`;
    });

    await proc;
    spinner.stop();
    log(chalk`{green ⓡ}  Hull Configuration Applied`);
  } catch (error) {
    spinner.stop();
    log(chalk`{red ⓡ}  Hull Configuration Failed`);
    log(error);
    process.exitCode = error.code;
  }
})();
