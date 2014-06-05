var viewEngine = require('view-engine');
var viewEngineDust = require('view-engine-dust');
var dust = viewEngineDust.dust;
viewEngine.register('dust', viewEngineDust);
require('../../dust-helpers').registerHelpers(dust);
require('raptor-widgets').initAllWidgets();

