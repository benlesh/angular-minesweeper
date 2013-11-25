angular-minesweeper.js
===========================

MIT License

A step by step guide to creating a very simple minesweeper game in Angular.

To view the various "steps" in development, (or at least the development in different stages as it progresses), please
checkout the various branches.

----

# Step 1: Let's create the game board.

1. Add the `web/index.html`. Make sure that you're referencing `../bower_components/angular/angular.js` and
`js/minsweeper.js` (which is the location of our final .js file we're concatenating with our Grunt process)
2. Add a controller file: `src/Controllers/MineSweeperCtrl.js' this will be the primary controller for our Minesweeper
game.
3. Add the module reference to bootstrap our app to your html tag: `<html ng-app="minesweeper">`.
4. Add a `<div>` tag to the body that references our `MineSweeperCtrl`: `<div ng-controller="MineSweeperCtrl"></div>`.
5. Add some code to generate the grid for our board to the controller `MineSweeperCtrl.js`.
6. Add some repeaters to the html to display our grid.