angular.module('minesweeper', []);
angular.module('minesweeper').controller('MineSweeperCtrl',
    [
        '$scope',
        function ($scope) {
            var ctrl = this;

            /**
             * returns an array of arrays with the outer array containing rows, and the inner array
             * containing columns within those rows.
             * @param width
             * @param height
             * @returns {Array}
             */
            ctrl.createGrid = function (width, height) {
                var grid = [],
                    row, x, y;
                for (y = 0; y < height; y++) {
                    row = [];
                    for (x = 0; x < width; x++) {
                        row.push(null);
                    }
                    grid.push(row);
                }
                return grid;
            };

            $scope.gridWidth = 20;
            $scope.gridHeight = 20;

            $scope.grid = ctrl.createGrid($scope.gridWidth, $scope.gridHeight);
        }
    ]);
