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

1. Handle connections to the hub to track connected users.
2. Push updates to the connected list of users to the clients.
3. Add a way to change the user's name in that list (so we know who's who)
