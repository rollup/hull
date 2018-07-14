const { join } = require('path');

const { json, template } = require('mrm-core');

module.exports = () => {
  const { name } = json('package.json');
  const readme = template('README.md', join(__dirname, './README.md'));

  if (!readme.exists()) {
    const startCase = (name) =>
      name.replace(name.charAt(0), name.charAt(0).toUpperCase());

    readme
      .apply({package: name})
      .save();
  }
};
