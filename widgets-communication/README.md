Sample App: Widgets (binding behavior)
======================================

This sample app utilizes the following RaptorJS modules to demonstrate how to bind behavior to rendered UI components using the [raptor-widgets](https://github.com/raptorjs3/raptor-optimizer) module:

* [raptor-widgets](https://github.com/raptorjs3/raptor-widgets)
* [raptor-templates](https://github.com/raptorjs3/raptor-templates)
* [raptor-optimizer](https://github.com/raptorjs3/raptor-optimizer)

# Installation

```
git clone https://github.com/raptorjs3/raptor-samples.git
cd raptor-samples/widgets-bind-behavior
npm install
node server
```

Navigate to [http://localhost:8080/](http://localhost:8080/) to see your application in action!

# Additional Details

## Project Structure

```bash
./
├── server.js # Starts the server
└── src/ # Source code for the application
    └── pages/ # Top-level page modules
        └── index/ # The main index page
            ├── index.js # Page middleware
            ├── optimizer.json # Page dependencies
            ├── template.rhtml # Page template
            └── widget.js # Client-side behavior
```