angular.module('minesweeper').controller('MultiplayerGameCtrl', [
    '$scope', 'minesweeperServer',
    function ($scope, minesweeperServer) {
        var self = this;

        self.onPlayerList = function (e, playerList) {
            $scope.players = playerList.filter(function(player) {
                return player.ConnectionId !== minesweeperServer.connectionId();
            });
        };

        $scope.$on('minesweeper:playerList', self.onPlayerList);

        $scope.setName = function (){
            minesweeperServer.setName($scope.name);
        };
    }
]);