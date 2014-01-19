angular.module('minesweeper').controller('MineSweeperCtrl',
    [
        '$scope', '$window',
        function ($scope, $window) {
            var ctrl = this,
                Math = $window.Math;

            ctrl.createGrid = function (width, height) {
                var grid = [],
                    row, x, y;
                for (y = 0; y < height; y++) {
                    row = [];
                    for (x = 0; x < width; x++) {
                        row.push({
                            x: x,
                            y: y,
                            mine: false,
                            nearby: 0,
                            hidden: true
                        });
                    }
                    grid.push(row);
                }
                return grid;
            };

            $scope.reveal = function(cell) {
                cell.hidden = false;
            };

            ctrl.addMines = function (grid, mineCount) {
                var laid = 0,
                    cell;

                var incrementNearby = function(cell) {
                    cell.nearby++;
                };

                while (laid < mineCount) {
                    cell = ctrl.getRandomCell(grid);
                    if (!cell.mine) {
                        cell.mine = true;
                        ctrl.traverseNearbyCells(grid, cell.x, cell.y, incrementNearby);
                        laid++;
                    }
                }
            };


            ctrl.getRandomCell = function (grid) {
                var height = grid.length,
                    width = grid[0].length,
                    x = Math.floor(Math.random() * width),
                    y = Math.floor(Math.random() * height);

                return grid[y][x];
            };

            ctrl.traverseNearbyCells = function (grid, originX, originY, fn) {
                var height = grid.length,
                    width = grid[0].length,
                    startX = Math.max(originX - 1, 0),
                    startY = Math.max(originY - 1, 0),
                    endX = Math.min(width - 1, originX + 1),
                    endY = Math.min(height - 1, originY + 1),
                    x, y;

                for (y = startY; y <= endY; y++) {
                    for (x = startX; x <= endX; x++) {
                        if (x !== originX || y !== originY) {
                            fn(grid[y][x]);
                        }
                    }
                }
            };

            $scope.gridWidth = 8;
            $scope.gridHeight = 8;
            $scope.mineCount = 10;

            $scope.grid = ctrl.createGrid($scope.gridWidth, $scope.gridHeight);
            ctrl.addMines($scope.grid, $scope.mineCount);
        }
    ]);
