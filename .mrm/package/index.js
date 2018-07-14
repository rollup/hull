/* eslint-disable no-template-curly-in-string */
const { basename } = require('path');

const meta = require('user-meta');
const gitUsername = require('git-username');
const { json, install } = require('mrm-core');

const packages = ['@webpack-contrib/schema-utils', 'loader-utils'];

const devPackages = [
  // Utilities
  'standard-version',
  '@commitlint/cli',
  '@commitlint/config-conventional',
  'conventional-github-releaser',
  'husky',

  // Jest
  '@types/jest',
  'jest',
  'ts-jest',

  // Babel
  'babel-cli',
  'babel-polyfill',
  'babel-preset-env',
  'babel-plugin-transform-object-rest-spread',

  // ESLint
  'eslint',
  'eslint-plugin-import',
  'eslint-plugin-prettier',
  '@webpack-contrib/eslint-config-webpack',
  'lint-staged',
  'pre-commit',
  'prettier',

  // Webpack
  'webpack',
];

module.exports = (config) => {
  const { name } = meta;
  const github = gitUsername();
  const {name: packageName = basename(process.cwd()) } = json('package.json');
  const repository = `${github}/${packageName}`;

  const file = json('package.json');
  const existing = file.get();

  json('package.json')
    .set({
      name: `${packageName}`,
      version: existing.version || '0.1.0',
      description: existing.description || '',
      license: existing.license || 'MIT',
      repository: `${repository}`,
      author: existing.author || `${name}`,
      homepage: `https://github.com/${repository}`,
      bugs: `https://github.com/${repository}/issues`,
      bin: existing.bin || '',
      main: existing.main || '',
      engines: {
        node: `>= ${config.activeLTS}`,
      },
      scripts: {
        commitlint: 'commitlint',
        commitmsg: 'commitlint -e $GIT_PARAMS',
        lint: 'tslint --project . && eslint --cache src test',
        'ci:lint:commits':
          'commitlint --from=${CIRCLE_BRANCH} --to=${CIRCLE_SHA1}',
        'lint-staged': 'lint-staged',
        security: 'npm audit',
        test: 'jest',
        'test:watch': 'jest --watch',
        'test:coverage': 'jest --collectCoverageFrom="src/**/*.ts" --coverage',
        'ci:lint': 'npm run lint && npm run security',
        'ci:test': 'npm run test -- --runInBand',
        'ci:coverage': 'npm run test:coverage -- --runInBand',
        hull: 'npx mrm',
      },
      files: existing.files || ['dist/', 'lib/', 'index.js'],
      peerDependencies: existing.peerDependencies || { webpack: '^${config.rollupVersion}' },
      dependencies: existing.dependencies || {},
      devDependencies: existing.devDependencies || {},
      keywords: existing.keywords || ['rollup'],
      jest: {
        moduleFileExtensions: [
          'ts',
          'tsx',
          'js'
        ],
        globals: {
          'ts-jest': {
            'tsConfigFile': 'tsconfig.json'
          }
        },
        testEnvironment: 'node',
        testMatch: [
          '**/test/*.+(ts)'
        ],
        transform: {
          '^.+\\.(ts)$': 'ts-jest'
        },
      },
      'pre-commit': 'lint-staged',
      'lint-staged': {
        '*.js': ['tslint --project . --fix', 'eslint --fix', 'git add'],
      },
    })
    .save();
  install(packages, { dev: false });
  install(devPackages);
};
