const { resolve } = require('path');

const { json } = require('mrm-core');

const localPath = process.cwd().split('node_modules').shift();
const pkg = json(resolve(localPath, 'package.json'));
const scriptPath = ['scripts', 'hull'];

if (!pkg.get(scriptPath)) {
  pkg
    .set(scriptPath, 'hull')
    .save();
}
