angular-minesweeper.js
===========================

MIT License

A step by step guide to creating a very simple minesweeper game in Angular.

To view the various "steps" in development, (or at least the development in different stages as it progresses), please
checkout the various branches.

----

# Step 5 - Add some game logic

1. End the game if the user clicks a mine.
   a. Add a check in the click event to see if the cell clicked is a mine.
   b. If the user clicks a mine, the user loses.
2. End the game if the user clicks everything BUT the mines.
   a. Add a check in the click to see if there is nothing left hidden but mines.
   b. If only mines are left, then the user wins.