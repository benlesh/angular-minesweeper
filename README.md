angular-minesweeper.js
===========================

MIT License

A step by step guide to creating a very simple minesweeper game in Angular.

To view the various "steps" in development, (or at least the development in different stages as it progresses), please
checkout the various branches.

----

# Multiplayer with SignalR Step 4: Set player name

### On the server:
- Add a `SetName` method to the hub that sets the `Name` of the `Player` in the PlayerList.
- Have `SetName` call `SendPlayerList`

### On the client:
- Add a `setName` method to the `minesweeperServer` service that calls `SetName` on the hub.
- Set up a form to update the user's name that calls `minesweeperServer.setName()`