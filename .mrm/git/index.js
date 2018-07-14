const { lines } = require('mrm-core');

const gitignore = [
  '.DS_Store',
  '.eslintcache',
  '.idea',
  '.vscode',

  'npm-debug.log*',
  'Thumbs.db',

  //
  '/coverage',
  '/dist',
  '/local',
  '/node_modules',
  '/reports',
];

const gitattributes = [
  'package-lock.json -diff',
  '* text=auto',
  'bin/* eol=lf',
];

module.exports = () => {
  lines('.gitignore')
    .add(gitignore)
    .save();

  lines('.gitattributes')
    .add(gitattributes)
    .save();
};
