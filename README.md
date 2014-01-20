angular-minesweeper.js
===========================

MIT License

A step by step guide to creating a very simple minesweeper game in Angular.

To view the various "steps" in development, (or at least the development in different stages as it progresses), please
checkout the various branches.

----

# Multiplayer with SignalR Step 7: Notify others when you've won

### On the server
- set up an a hub method `SubmitWin` that accepts an int or long for milliseconds. This will be a count of how long
it took the user to win. When it's called, update the user's `Player` object in the PlayerList, if it's less than
the stored value, or if the stored value is null.
- Have the `SubmitWin` call `SendPlayerList` to update results.

### On the client
- Whenever the user wins, have it send the number of milliseconds it took to the server with the hub's `SubmitWin`
- When the playerList is retrieved, find the player with the lowest time to win and flag them as "king".
- Also use a filter to sort the fastest winning opponent to the top of the list.