angular-minesweeper.js
===========================

MIT License

A step by step guide to creating a very simple minesweeper game in Angular.

To view the various "steps" in development, (or at least the development in different stages as it progresses), please
checkout the various branches.

----

#Let's Begin: The Basic Project Structure

This branch embodies the basic set up for our application.

Things added so far:

1. Gruntfile.js - A configuration file for GruntJS, a task running tool. This will run our JavaScript "build", which will
concatenate, LINT (with JSHint) and Test our components.
2. package.json - The node package config file. This has references to all of the node modules used, primarily by our
Grunt tasks at this point.
3. bower.json - This is the Bower package config file. This has references to client-side JavaScript files we're pulling
down from Bower, such as AngularJS and Angular's test suite Angular-Mocks.
4. A basic file structure. We need to organize our code in a way that is easy to manage, so I've seperated our testing
files (Jasmine specs) into a folder called `tests/` and the source for our minesweeper module into a folder call `src/`.
Output JS files will be stored in `web/js`, and our .html file will be in `web/`.

