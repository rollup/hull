const merge = require('merge-options').bind({ concatArrays: true });
const { json, lines } = require('mrm-core');

module.exports = () => {

  const configs = [
    './config/base',
    './config/best-practices',
    './config/es2015',
    './config/imports',
    './config/node',
    './config/possible-errors',
    './config/style',
    './config/variables',
  ];

  const eslintrc = configs.reduce((result, config) => {
    return merge(result, require(config));
  }, {});

  json('.eslintrc.json', eslintrc)
    .save();

  lines('.eslintignore')
    .add(['/node_modules', '/dist'])
    .save();
};
