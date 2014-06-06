Sample App: Weather (Dust)
======================================

This sample app utilizes the following RaptorJS modules:

* [dustjs-linkedin](https://github.com/linkedin/dustjs)
* [raptor-args](https://github.com/raptorjs3/raptor-args)
* [raptor-optimizer](https://github.com/raptorjs3/raptor-optimizer)
* [raptor-renderer](https://github.com/raptorjs3/raptor-renderer)
* [raptor-sample-ui-components](https://github.com/raptorjs3/raptor-sample-ui-components)
* [raptor-widgets](https://github.com/raptorjs3/raptor-widgets)
* [view-engine](https://github.com/patrick-steele-idem/view-engine)
* [view-engine-dust](https://github.com/patrick-steele-idem/view-engine-dust)

# Installation

```
git clone https://github.com/raptorjs3/raptor-samples.git
cd raptor-samples/weather-dust
npm install
node server
```

Navigate to [http://localhost:8080/](http://localhost:8080/) to see your application in action!

If you want to be able to write code and have the browser page automatically refresh then the following commands are recommended:

```
npm install browser-refresh -g
browser-refresh
```

# Additional Details

## Project Structure

```bash
./
├── config/ # Configuration files
│   ├── config.json # Configuration defaults
│   └── production.json # Production overrides
├── config.js # Helper module for loading the configuration
├── package.json # npm metadata
├── routes.js # Registers URL routes
├── server.js # Starts the server
└── src/ # Source code for the application
    ├── api/ # API endpoint implementations
    │   └── weather.js
    ├── components/ # Components/custom tags
    │   ├── app-choose-location/
    │   │   ├── optimizer.json # Client-side dependencies
    │   │   ├── renderer.js # HTML renderer
    │   │   ├── style.css # UI Component styling
    │   │   ├── template.dust # HTML template
    │   │   └── widget.js # Client-side behavior
    │   ├── app-current-conditions/
    │   │   └── ...
    │   ├── app-location-weather/
    │   │   └── ...
    │   └── app-weather/
    │       └── ...
    ├── global-style/ # Module to control the style of all pages
    │   └── ...
    ├── layouts/ # Layout templates
    │   └── default-layout.dust
    ├── pages/ # Top-level page modules
    │   └── index/ # The main index page
    │       ├── index.js # Page middleware
    │       ├── optimizer.json # Page dependencies
    │       ├── style.less # Page-specific style
    │       └── template.dust # Page template
    ├── raptor-taglib.json # raptor-templates taglib definition
    ├── services/
    │   ├── package.json # Browser override configured in package.json
    │   ├── weather-service-browser.js # Browser-side version of the weather-service module
    │   ├── weather-service-util.js # Utility methods
    │   └── weather-service.js # Server-side version of the weather-service module
    ├── third-party/
    │   └── bootstrap/
    │       └── optimizer.json # Package up Bootstrap
    ├── dust-helpers-server.js # Module to register server-side only Dust helpers
    └── dust-helpers.js # Module to register Dust helpers
```

## Dust Helpers

Unlike with Raptor Templates, Dust requires that all helpers be explicitly registered before any templates are rendered (Raptor Templates automatically discovers taglibs based on a templates location on disk). The registration of helpers happens in the following modules:

* [src/dust-helpers.js](src/dust-helpers.js) (client/server helpers)
* [src/dust-helpers-server.js](src/dust-helpers-server.js) (server-only helpers)

Those modules register Dust helpers provided by the following modules:

* [raptor-optimizer](https://github.com/raptorjs3/raptor-optimizer) (server-side only)
* [raptor-taglib-async](https://github.com/raptorjs3/raptor-taglib-async)
* [raptor-taglib-layout](https://github.com/raptorjs3/raptor-taglib-layout)
* [raptor-widgets](https://github.com/raptorjs3/raptor-widgets)
* [raptor-sample-ui-components](https://github.com/raptorjs3/raptor-sample-ui-components)

In addition, helpers are also registered for all of the application's UI components using code similar to the following:

```javascript
var dust = require('view-engine-dust').dust;
var raptorDust = require('raptor-dust');

raptorDust.registerHelpers({
        'app-weather': require('./components/app-weather/renderer'),
        'app-choose-location': require('./components/app-choose-location/renderer'),
        'app-current-conditions': require('./components/app-current-conditions/renderer'),
        'app-location-weather': require('./components/app-location-weather/renderer')
    }, dust);
```

The above code binds Dust helpers to UI component renderers that encapsulate their rendering logic. With this approach, UI components are _not_ simply Dust partials. For example, sample Dust template code to embed the `app-choose-location` UI component is shown below:

```html
{@app-choose-location /}
```

Similarly, a button UI component can be embedded using the following Dust code:

```html
{@sample-button type="submit" label="Go" id="go" variant="primary" /}
```

The [sample-button](https://github.com/raptorjs3/raptor-sample-ui-components/tree/master/components/sample-button) UI component happens to use Raptor Templates to produce its HTML output, but since UI components encapsulate their rendering logic that does not matter.

## Resource Optimization

Unless the `NODE_ENV` environment variable is set to `production`, the application will start in development mode. In development mode, resource optimizations such as minification, concatenation and checksummed URLs are disabled to be more developer-friendly. Try starting the application using the following command to see what it looks like in the optimized production mode:

```
env NODE_ENV=production node server
```

Now navigate back to [http://localhost:8080/](http://localhost:8080/) and you should see less `<script>` and `<link>` tags (as a result of resource aggregation) and all source code should be minified.

