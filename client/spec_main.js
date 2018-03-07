require.config({
  baseUrl: './',
  paths: {
    jasmine: ['bower_components/jasmine-core/lib/jasmine-core/jasmine'],
    'jasmine-html': ['bower_components/jasmine-core/lib/jasmine-core/jasmine-html'],
    'jasmine-boot': ['bower_components/jasmine-core/lib/jasmine-core/boot']
  },
  shim: {
    'jasmine-html': {
      deps: ['jasmine']
    },
    'jasmine-boot': {
      deps: ['jasmine', 'jasmine-html']
    }
  }
});

require(['jasmine-boot'], function() {
  require(['spec/abvCalculatorTests'], function() { // eslint-disable-line global-require
    window.onload();
  });
});
