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

        hub.client.onUserList = function (userList) {
            $rootScope.$apply(function () {
                $rootScope.$broadcast('minesweeper:userList', userList);
            });
        };

        return {
            ping: function () {
                hub.server.ping();
            },
            setName: function (name) {
                hub.server.setName(name);
            },
            sendUserList: function () {
                hub.server.sendUserList();
            }
        }
    } ]);

} (window.angular));