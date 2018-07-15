const { join } = require('path');

const { template } = require('mrm-core');

module.exports = () => {
  const src = template('src/index.ts', join(__dirname, 'index.ts'));

  if (!src.exists()) {
    src.save();
  }
};
