module.exports = function(config) {
  config.set({
    autoWatch: false,
    basePath: '..',
    frameworks: ['mocha', 'chai', 'sinon'],
    browsers: ['PhantomJS'],
    singleRun: true,
    files: [
      'components/lodash/dist/lodash.js',
      'components/angular/angular.js',
      'components/angular-mocks/angular-mocks.js',
      'tests/libraries/mocker.js',
      'module.js',
      'beat-factory.js',
      'tests/*.js'
    ]
  });
};
