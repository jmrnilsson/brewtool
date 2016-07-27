define('calculatorView', [
  'models/calculator',
  'text!/templates/calculator.html'
], function(viewModel, template) {
  'use strict';

  return { viewModel: viewModel, template: template };
});

define('logView', [
  'models/log',
  'text!/templates/log.html'
], function(viewModel, template) {
  'use strict';

  return { viewModel: viewModel, template: template };
});

define('temperatureView', [
  'models/temperature',
  'text!/templates/temperature.html'
], function(viewModel, template) {
  'use strict';

  return { viewModel: viewModel, template: template };
});

define('graphView', [
  'models/graph'
], function(viewModel) {
  'use strict';

  return { viewModel: viewModel, template: '<div id="chart"></div>' };
});
