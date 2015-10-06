require.config({
  baseUrl: './', 
  paths: {
      'jasmine': ['bower_components/jasmine-core/lib/jasmine-core/jasmine'],
      'jasmine-html': ['bower_components/jasmine-core/lib/jasmine-core/jasmine-html'],
      'jasmine-boot': ['bower_components/jasmine-core/lib/jasmine-core/boot'],
      'q': ['bower_components/q/q']
  },
  shim: {
    'jasmine-html': {
      deps : ['jasmine']
    },
    'jasmine-boot': {
      deps : ['jasmine', 'jasmine-html']
    }
  }
});

require(['jasmine-boot'], function () {
  require(['spec/abvCalculatorTests'], function(){
    window.onload();
  })
});