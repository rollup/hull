/* eslint-disable no-template-curly-in-string */
const { basename } = require('path');

const meta = require('user-meta');
const gitUsername = require('git-username');
const { json, install } = require('mrm-core');

const dependencies = [];

const devDependencies = [
  // Utilities
  '@commitlint/cli',
  '@commitlint/config-conventional',
  'conventional-github-releaser',
  'del-cli',
  'husky',
  'standard-version',

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
  'lint-staged',
  'pre-commit',
  'prettier',

  'rollup',

  'tslint',
  'typescript'
];

module.exports = () => {
  // eslint-disable-next-line import/no-dynamic-require, global-require
  const { activeLTS, rollupVersion } = require('../config.json');
  const { name } = meta;
  const github = gitUsername();
  const { name: packageName = basename(process.cwd()) } = json('package.json');
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
        node: `>= ${activeLTS}`
      },
      scripts: {
        build: 'npm run build:clean && tsc',
        'build:clean': 'del-cli dist',
        'ci:coverage': 'npm run test:coverage -- --runInBand',
        'ci:lint': 'npm run lint && npm run security',
        'ci:lint:commits': 'commitlint --from=${CIRCLE_BRANCH} --to=${CIRCLE_SHA1}',
        'ci:test': 'npm run test -- --runInBand',
        commitlint: 'commitlint',
        commitmsg: 'commitlint -e $GIT_PARAMS',
        hull: 'hull',
        lint: 'tslint --project . && eslint --cache src test',
        'lint-staged': 'lint-staged',
        prepublishOnly: 'npm run build',
        security: 'npm audit',
        test: 'npm run build && jest',
        'test:watch': 'npm run test -- --watch',
        'test:coverage': 'npm run test -- --collectCoverageFrom="src/**/*.ts" --coverage'
      },
      files: existing.files || ['dist/', 'lib/', 'index.js'],
      peerDependencies: existing.peerDependencies || { rollup: `^${rollupVersion}` },
      dependencies: existing.dependencies || {},
      devDependencies: existing.devDependencies || {},
      keywords: existing.keywords || ['rollup'],
      jest: {
        moduleFileExtensions: ['ts', 'tsx', 'js'],
        globals: {
          'ts-jest': {
            tsConfigFile: 'tsconfig.json'
          }
        },
        testEnvironment: 'node',
        testMatch: ['**/test/*.+(ts)'],
        transform: {
          '^.+\\.(ts)$': 'ts-jest'
        }
      },
      'pre-commit': 'lint-staged',
      'lint-staged': {
        '*.js': ['tslint --fix', 'eslint --fix', 'git add']
      }
    })
    .save();
  install(dependencies, { dev: false });
  install(devDependencies);
};
