const { join } = require('path');

const { json, template } = require('mrm-core');

module.exports = () => {
  // eslint-disable-next-line import/no-dynamic-require, global-require
  const { activeLTS } = require('../config.json');
  const { description, name } = json('package.json').get();
  const readme = template('README.md', join(__dirname, './README.md'));

  if (!readme.exists()) {
    readme.apply({ activeLTS, description, name }).save();
  }
};
