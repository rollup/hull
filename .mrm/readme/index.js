const { join } = require('path');

const { json, template } = require('mrm-core');

module.exports = () => {
  const { activeLTS } = require('../config.json');
  const { description, name } = json('package.json').get();
  const readme = template('README.md', join(__dirname, './README.md'));

  if (!readme.exists()) {
    const startCase = (name) =>
      name.replace(name.charAt(0), name.charAt(0).toUpperCase());

    readme
      .apply({activeLTS, description, name})
      .save();
  }
};
