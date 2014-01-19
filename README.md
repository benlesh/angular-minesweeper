angular-minesweeper.js
===========================

MIT License

A step by step guide to creating a very simple minesweeper game in Angular.

To view the various "steps" in development, (or at least the development in different stages as it progresses), please
checkout the various branches.

----

#Step 3: update numbers around mines.

One of the features of minesweeper is that it displays a number of the mines in the adjacent 8 cells when you reveal
a cell.

To do this we'll need to:

1. Build a method to traverse nearby cells. It will have to handle cases where we're on the edge of the grid.
2. Use our new method when we're adding mines to the grid to update nearby cells. The updates should increment a number.
3. Display that number on the grid if it's more than 1.