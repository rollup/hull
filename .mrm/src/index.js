const { join } = require('path');

const { template } = require('mrm-core');

module.exports = () => {
  template('src/index.ts', join(__dirname, 'index.ts'))
    .save();
};
