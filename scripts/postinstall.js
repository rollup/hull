import { resolve } from 'path';
import { json } from 'mrm-core';

const localPath = process.cwd().split('node_modules').shift();

const pkg = json(resolve(localDir, 'package.json'));
const scriptPath = ['scripts', 'hull'];

if (!pkg.get(scriptPath)) {
  pkg
    .set(scriptPath, 'hull')
    .save();
}
