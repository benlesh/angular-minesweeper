angular-minesweeper.js
===========================

MIT License

A step by step guide to creating a very simple minesweeper game in Angular.

To view the various "steps" in development, (or at least the development in different stages as it progresses), please
checkout the various branches.

----

# Multiplayer with SignalR Step 3: Get a list of connected players

### On the Server:

- Handle `OnConnect` and `OnDisconnect` in your Hub to maintain a list of Players.
- Create a Hub method `SendPlayers` to Broadcast a Player List to all connected clients.
- Have `OnConnect` and `OnDisconnect` call `SendPlayers` after it updates the list.

### On the Client:

- Have the server service fire an Angular event when the player list has been updated.
- Create a controller for your multiplayer game called `MultiplayerGameCtrl`, have it handle the
event we just created and update a property on the $scope to display.