(function (angular) {
    var app = angular.module('minesweeper-signalr', []);

    app.factory('minesweeperServer', ['$window', '$rootScope', function ($window, $rootScope) {
        var conn = $window.$.connection,
            hub = conn.minesweeperHub;

        // start the connection
        conn.hub.start();

        // set up events to monitor server pushes.
        hub.client.onServerMessage = function (message) {
            $rootScope.$apply(function () {
                $rootScope.$broadcast('minesweeper:serverMessage', message);
            });
        };

        // event for player list
        hub.client.onPlayerList = function(playerList) {
            $rootScope.$apply(function() {
                $rootScope.$broadcast('minesweeper:playerList', playerList);
            });
        };

        return {
            ping: function () {
                hub.server.ping();
            }
        };
    } ]);

} (window.angular));