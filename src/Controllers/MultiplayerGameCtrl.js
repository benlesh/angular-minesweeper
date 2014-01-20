angular.module('minesweeper').controller('MultiplayerGameCtrl', [
    '$scope', 'minesweeperServer',
    function ($scope, minesweeperServer) {
        var self = this;

        self.onPlayerList = function (e, playerList) {
            $scope.players = playerList;
        };

        $scope.$on('minesweeper:playerList', self.onPlayerList);
    }
]);