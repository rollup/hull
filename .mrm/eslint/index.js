const { lines } = require('mrm-core');

module.exports = () => {
  lines('.eslintignore')
    .add(['/node_modules', '/dist'])
    .save();
};
