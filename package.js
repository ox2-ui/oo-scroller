Package.describe({
  name: 'ox2:scroller',
  summary: 'TESTING_DO_NOT_USE Native scroller',
  version: '3.1.0',
  git: ' /* Fill me in! */ '
});

var S = 'server';
var C = 'client';
var CS = [C, S];

Package.onUse(function(api) {
  api.versionsFrom('1.2.0.2');
  // Core
  api.use([
    'templating',
    'less'
    ]);
  // 3rd party
  api.use([
    'mquandalle:jade@0.4.9'
    ]);
  api.addFiles('lib/oo-scroller.jade', C);
  api.addFiles('lib/oo-scroller.js', C);
  api.addFiles('lib/oo-scroller.less', C);
});

Package.onTest(function(api) {
  api.use('tinytest');
  api.use('ox2:scroller');
  api.addFiles('tests/oo-scroller-tests.js');
});
