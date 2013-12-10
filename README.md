angular-minesweeper.js
===========================

MIT License

A step by step guide to creating a very simple minesweeper game in Angular.

To view the various "steps" in development, (or at least the development in different stages as it progresses), please
checkout the various branches.

----
# Step 7: Add auto-reveal

This functionality will be to reveal adjacent areas when the user clicks on a cell that doesn't border a mine.

We'll reuse the `traverseNearbyCells` method to recursively reveal cells that don't border mines.