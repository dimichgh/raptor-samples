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

4: Navigate to [http://localhost:8080/](http://localhost:8080/) in your browser

# Project Structure

```
├── components - Directory containing custom tag implementations
│   ├── app-button - Custom tag with a renderer and a template
│   │   ├── renderer.js
│   │   └── template.rhtml
│   ├── app-hello-renderer - Custom tag with just a JavaScript renderer
│   │   └── renderer.js
│   └── app-hello-template - Custom tag with just a template
│       └── template.rhtml
├── index.rhtml - Page template
├── package.json - npm metadata
├── raptor-taglib.json - Raptor Templates taglib
├── server.js - JavaScript entry point for this application
└── static - Folder containing static JavaScript and CSS files
    ├── reset.css
    └── style.css
```

# Details

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

This sample app includes a `raptor-taglib.json` in the root that is used to register the custom tags. This taglib file is automatically discovered by searching up the directory tree from a template's location on disk. For this sample, the `raptor-taglib.json` is the following:

```json
{
    "tags-dir": "./components"
}
```

This simple taglib tells the Raptor Templates compiler to scan the `components` directory to discover custom tags. This app has three custom tags:

1. __app-button:__ Custom tag that renders a Bootstrap button with support for a "variant" and a "size" attribute and all other attributes pass-through to the button element.
2. __app-hello-renderer:__ Custom tag with a JavaScript renderer only
3. __app-hello-template:__ Custom tag with a template only
