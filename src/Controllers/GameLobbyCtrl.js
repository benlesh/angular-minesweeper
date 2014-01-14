angular.module('minesweeper').controller('GameLobbyCtrl', ['$scope', function($scope) {
    $scope.$on('minesweeper:userList', function(e, userList) {
        $scope.users = userList;
    });
}]);
