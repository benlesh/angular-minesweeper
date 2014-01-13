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
                $rootScope.$broadcast('minesweeperServer:serverMessage', message);
            });
        };

        return {
            ping: function () {
                hub.server.ping();
            }
        }
    } ]);

    app.controller('PingPongCtrl', ['$scope', 'minesweeperServer', function ($scope, minesweeperServer) {
        $scope.ping = function () {
            minesweeperServer.ping();
        };

        $scope.$on('minesweeperServer:serverMessage', function (e, msg) {
            $scope.serverMessage = msg;
        });
    } ]);

} (window.angular));