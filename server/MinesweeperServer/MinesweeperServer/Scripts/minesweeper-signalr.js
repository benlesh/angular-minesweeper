(function (angular) {
    var app = angular.module('minesweeper-signalr', ['minesweeper']);

    app.factory('minesweeperServer', [
        '$window', '$rootScope', '$q',
        function ($window, $rootScope, $q) {
            var conn = $window.$.connection,
            hub = conn.minesweeperHub;

            // start the connection
            var startDeferred = $q.defer();
            var connectionStarted = startDeferred.promise;
            conn.hub.start().done(startDeferred.resolve);

            // set up events to monitor server pushes.
            hub.client.onServerMessage = function (message) {
                $rootScope.$apply(function () {
                    $rootScope.$broadcast('minesweeper:serverMessage', message);
                });
            };

            // event for player list
            hub.client.onPlayerList = function (playerList) {
                $rootScope.$apply(function () {
                    $rootScope.$broadcast('minesweeper:playerList', playerList);
                });
            };

            return {
                ping: function () {
                    connectionStarted.then(hub.server.ping);
                },
                setName: function (name) {
                    connectionStarted.then(function () {
                        hub.server.setName(name);
                    });
                }
            };
        }
    ]);

} (window.angular));