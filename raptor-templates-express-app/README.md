Sample App: Raptor Templates + Express
======================================

This sample app illustrates how to integrate Raptor Templates with a very basic Express app. For this sample app, we use the streaming API to stream the output of the template rendering to the HTTP response stream. In addition, this sample application illustrates how to create custom tags that can be embedded into your templates.

# Installation

```
git clone https://github.com/raptorjs3/samples.git
cd samples/raptor-templates-express-app
npm install
node server
```

Navigate to [http://localhost:8080/](http://localhost:8080/) to see your server in action!

# Project Structure

```
.
├── components - Directory containing custom tag implementations
│   ├── app-button - Custom tag for rendering a Bootstrap-styled button
│   │   ├── renderer.js
│   │   └── template.rhtml
│   ├── app-header - Custom tag for rendering the page header (template only)
│   │   └── template.rhtml
│   └── app-hello - Custom tag rendering a simple message (JavaScript renderer only)
│       └── renderer.js
├── footer.rhtml - An include target
├── index.rhtml - The page template
├── package.json - npm metadata
├── raptor-taglib.json - Raptor Templates taglib used to discover custom tags
├── server.js - JavaScript entry point for this application
└── static - Folder containing static JavaScript and CSS files
    ├── reset.css
    └── style.css
```

# Details

## Page Rendering

This application registers a single "/" route that renders out the main index page using the `index.rhtml` template.

The template is loaded using the following code:

```javascript
var indexTemplate = require('raptor-templates').load(require.resolve('./index.rhtml'));
```

Later, in the route handler, the template is rendered to a stream and the resulting stream is piped to the HTTP response stream. That code is shown below:

```javascript
indexTemplate.stream({
        name: 'Frank',
        count: 30,
        colors: ['red', 'green', 'blue']
    })
    .pipe(res);
```

As with all Node.js streams, when piping to a target stream, the target stream is ended when the source stream is done producing data. Since we are piping to an HTTP response stream, the HTTP response stream is ended and the connection is closed.

## Custom Tags

This sample app includes a `raptor-taglib.json` in the root that is used to register the custom tags. This taglib file is automatically discovered by searching up the directory tree from a template's location on disk. For this sample, the `raptor-taglib.json` is the following:

```json
{
    "tags-dir": "./components"
}
```

This simple taglib tells the Raptor Templates compiler to scan the `components` directory to discover custom tags. In this sample app, the following three custom tags will be discovered and registered:

1. `<app-button/>`
2. `<app-header/>`
3. `<app-hello/>`

The `<app-button/>` custom tag uses an tag definition embedded in `renderer.js` to declare which attributes are allowed. This tag definition is shown below:

```javascript
exports.tag = {
    attributes: {
        label: 'string',
        href: 'string',
        variant: 'string', // primary | info | success | warning | danger | inverse
        size: 'string', // large | small | mini
        toggle: 'boolean',
        toggled: 'boolean',
        dropdown: 'boolean',
        '*': 'string'
    }
};
```

## Includes

This sample app also illustrates how to use the `<c-include>` tag to include another template. In `index.rhtml` the following code is used to include the footer template:

```html
<c-include template="./footer.rhtml"/>
```

_NOTE: Custom tags are often a better choice over using template includes. In this sample app, the header is a custom tag and the footer is an include so that you can see the difference._