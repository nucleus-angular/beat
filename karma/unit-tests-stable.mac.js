basePath = '..';

files = [
  JASMINE,
  JASMINE_ADAPTER,
  'components/lodash/dist/lodash.legacy.js',
  'components/angular/angular.js',
  'components/angular-mocks/angular-mocks.js',
  'tests/libraries/mocker.js',
  '*.js',
  'tests/*.js'
];

reporters = ['dots'];

autoWatch = false;

browsers = ['Chrome', 'Firefox', 'Safari', 'Opera'];

singleRun = true;