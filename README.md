angular-minesweeper.js
===========================

MIT License

A step by step guide to creating a very simple minesweeper game in Angular.

To view the various "steps" in development, (or at least the development in different stages as it progresses), please
checkout the various branches.

----

Step 6: Score keeping (and resetting the game).

1. Have the game board reset after a win or a lose condition is met.
   a. Create a reset function: Refactor grid creation and adding of mines to be something that can be called within
   the `win()` or `lose()` functions.
   b. Call the reset function from the win() and lose() functions.
2. Create a scoring mechanism. Could be a timer, could be wins and loses. We'll do both.
   a. Increment a wins counter in `win()`
   b. Increment a losses counter in `lose()`
   c. Get a timestamp at the beginning of the game.
   d. Get a timestamp at the end of the game and do some math to record the "best time"