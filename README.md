angular-minesweeper.js
===========================

MIT License

A step by step guide to creating a very simple minesweeper game in Angular.

To view the various "steps" in development, (or at least the development in different stages as it progresses), please
checkout the various branches.

----

#Step 2: Add mines to the grid

1. Create a method to add a specified number mines to the grid at random
2. We'll have to test to make sure that we're not going to add a mine to the same cell twice! This means we're going
to have to inject `$window` as a dependency so we can mock `$window.Math.random()`.