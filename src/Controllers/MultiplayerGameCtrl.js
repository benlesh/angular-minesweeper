angular.module('minesweeper').controller('MultiplayerGameCtrl', [
    '$scope', 'minesweeperServer',
    function ($scope, minesweeperServer) {
        var self = this;

        self.onPlayerList = function (e, playerList) {
            // players that don't have a BestTime need to be sorted
            // to last place.
            angular.forEach(playerList, function(player) {
                player.king = false;
                if(!player.BestTime && player.BestTime !== 0) {
                    player.BestTime = Infinity;
                }

                // get the currest user's best time for display.
                if(player.ConnectionId === minesweeperServer.connectionId()) {
                    $scope.userBestTime = player.BestTime;
                }
            });

            // sort them by BestTime ascending.
            playerList = playerList.sort(function(a, b) {
                return a.BestTime > b.BestTime;
            });

            // mark the king.
            playerList[0].king = true;

            // if the user is the king. make note of it. Since it's displayed elsewhere.
            $scope.userIsKing = playerList[0].ConnectionId === minesweeperServer.connectionId();

            // filter out the user from the players list to display.
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