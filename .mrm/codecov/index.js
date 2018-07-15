const { yaml } = require('mrm-core');

module.exports = () => {
  // .set overwrites
  yaml('codecov.yml')
    .set({
      codecov: {
        branch: 'master'
      },
      coverage: {
        precision: 2,
        round: 'down',
        range: '70...100',
        status: {
          project: 'no',
          patch: 'yes'
        }
      },
      comment: 'off'
    })
    .save();
};
