Sample App: Raptor Templates + Express
======================================

This sample app illustrates how to integrate Raptor Templates with a very basic Express app. For this sample app, we use the streaming API to stream the output of the template rendering to the HTTP response stream. In addition, this sample application illustrates how to create custom tags that can be embedded into your templates.

# Installation

1. Clone this repository
2. `npm install`
3: `node server`
4: Navigate to [http://localhost:8080/] in your browser

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