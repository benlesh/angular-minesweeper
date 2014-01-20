angular.module('minesweeper').controller('MultiplayerGameCtrl', [
   '$scope',
   function ($scope) {
      var self = this;

      self.onPlayerList = function(e, playerList) {
         $scope.players = playerList;
      };

      $scope.$on('minesweeper:playerList', self.onPlayerList);
   }
]);