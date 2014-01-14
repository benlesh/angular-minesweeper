angular.module('minesweeper').controller('GameLobbyCtrl',
    ['$scope', 'minesweeperServer',
        function ($scope, minesweeperServer) {
            var self = this;

            self.userListHandler =  function (e, userList) {
                $scope.users = userList;
            };

            $scope.$on('minesweeper:userList', self.userListHandler);

            $scope.refreshUsers = function () {
                minesweeperServer.sendUserList();
            };

            $scope.changeName = function (){
                minesweeperServer.setName($scope.name);
            };
        }]);
