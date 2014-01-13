angular-minesweeper.js
===========================

MIT License

A step by step guide to creating a very simple minesweeper game in Angular.

To view the various "steps" in development, (or at least the development in different stages as it progresses), please
checkout the various branches.

----

#Multiplayer with SignalR Step 2: Getting things talking

Okay, we have a lot of lifting to do to get these to applications talking...

1. We need to create a SignalR Hub in .NET.
2. We need to create the proper services in Angular to access SingalR and the Hub.
   - Creating a signalR service.
   - Create a service for the hub itself.
   - Create a simple controller testing this (PingPongCtrl, which we'll remove/alter later)
3. Let's send something like Ping! Pong! back and forth as a test.
