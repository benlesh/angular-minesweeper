angular-minesweeper.js
===========================

MIT License

A step by step guide to creating a very simple minesweeper game in Angular.

To view the various "steps" in development, (or at least the development in different stages as it progresses), please
checkout the various branches.

----

# Multiplayer with SignalR Step 6: Show boards for other players

### On the server

- Add hub method `UpdateGrid` that accepts an array of booleans for what's shown and what's hidden.
- Add that grid to the player's Player record in the PlayerList
- Have `UpdateGrid` call `SendPlayerList`

### On the client

- Identify the user's player record in the player list by connection id, and filter it out of the display.
- Create grids for the other players that are built from the array of bools returned from the server.