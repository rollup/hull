const { join } = require('path');

const { json, template } = require('mrm-core');

module.exports = () => {
  const { name } = json('package.json');
  const test = template('test/test.ts', join(__dirname, './test.ts'));

  if (!test.exists()) {
    test
      .apply({package: name.replace('@rollup-cabal/', '')})
      .save();
  }
};
