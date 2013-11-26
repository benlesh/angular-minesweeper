angular.module('minesweeper', []);
angular.module('minesweeper').controller('MineSweeperCtrl',
    [
        '$scope', '$window',
        function ($scope, $window) {
            var ctrl = this,
                Math = $window.Math;

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
                        row.push({
                            x: x,
                            y: y,
                            mine: false
                        });
                    }
                    grid.push(row);
                }
                return grid;
            };

            ctrl.addMines = function (grid, mineCount) {
                var laid = 0,
                    cell;

                while (laid < mineCount) {
                    cell = ctrl.getRandomCell(grid);
                    if(!cell.mine) {
                        cell.mine = true;
                        laid++;
                    }
                }
            };

            ctrl.getRandomCell = function(grid) {
                var height = grid.length,
                    width = grid[0].length,
                    x = Math.floor(Math.random() * width),
                    y = Math.floor(Math.random() * height);

                return grid[y][x];
            };

            $scope.gridWidth = 20;
            $scope.gridHeight = 20;

            $scope.grid = ctrl.createGrid($scope.gridWidth, $scope.gridHeight);
        }
    ]);
