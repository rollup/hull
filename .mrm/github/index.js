const { resolve } = require('path');

const pathExists = require('path-exists');
const { copyFiles } = require('mrm-core');

const files = [
  '.github/ISSUE_TEMPLATE/BUG.md',
  '.github/ISSUE_TEMPLATE/DOCS.md',
  '.github/ISSUE_TEMPLATE/FEATURE.md',
  '.github/ISSUE_TEMPLATE/MODIFICATION.md',
  '.github/ISSUE_TEMPLATE/SUPPORT.md',
  '.github/PULL_REQUEST_TEMPLATE.md',
  '.github/CONTRIBUTING.md',
  '.github/ISSUE_TEMPLATE.md',
];

module.exports = () => {
  copyFiles(__dirname, files);
};
