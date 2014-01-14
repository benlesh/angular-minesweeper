angular-minesweeper.js
===========================

MIT License

A step by step guide to creating a very simple minesweeper game in Angular.

To view the various "steps" in development, (or at least the development in different stages as it progresses), please
checkout the various branches.

----

#Multiplayer with SignalR Step 3: Game Lobby. Part 1

Now that we have things talking, let's create a way for players to get together. Eventually, we'll need to group players
into groups to play against each other, but for now we just need to know who's connected.

On the server:

1. Override `OnConnected` on the hub and have it add to a static `UserList` dictionary on the hub.
2. Override `OnDisconnected` on the hub to have it remove the user from the `UserList`.
3. Create a `SendUserList` method on the hub. This can be used to refresh user list data from the client, or it can be
used from other code in the Hub to push the list back to the client.
4. Have `OnConnected` call `SendUserList`.
5. Create a `SetName(name)` method on the hub the user can use to update their name.
6. Have `SetName` call `SendUserList`

On the client:

1. Have our new `minesweeper-signalr` module reference the `minesweeper` module.
2. Remove that `PingPongCtrl` we created earlier, it was just a test.
3. Create a `GameLobbyCtrl` controller in our `minesweeper` module. This will hold the generic logic for managing the
game lobby.
4. Add to our `minesweeperServer` service in `minesweeper-signalr`:
   - Handle `hub.server.onUserList` and fire an event `minesweeper:userList` in angular.
   - Create a method on the service `setName` to call `hub.server.setName()`.
5. Handle the `minesweeper:userList` event in the `GameLobbleCtrl` and add the returned list to the `$scope`.
6. Display the list of users in your view with an `ng-repeat`.
7. Add a simple form to update your name.


