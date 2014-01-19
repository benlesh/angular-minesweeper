angular.module('minesweeper').controller('MineSweeperCtrl',
    [
        '$scope', '$window', '$timeout',
        function ($scope, $window, $timeout) {
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

            ctrl.lose = function () {
                ctrl.revealAll($scope.grid);
                $scope.losses++;
                $timeout(ctrl.showLoss);
            };

            ctrl.showLoss = function () {
                $window.alert('you lose!');
                $scope.resetGrid();
            };

            ctrl.win = function () {
                ctrl.revealAll($scope.grid);
                $scope.wins++;
                var totalTime = ctrl.getTime() - $scope.startTime;
                if (totalTime < $scope.bestTime) {
                    $scope.bestTime = totalTime;
                }
                $timeout(ctrl.showWin);
            };


            ctrl.showWin = function () {
                $window.alert('you win!');
                $scope.resetGrid();
            };

            $scope.reveal = function (cell) {
                cell.hidden = false;
                if (cell.mine) {
                    ctrl.lose();
                    return;
                }
                if (cell.nearby === 0) {
                    ctrl.autoReveal($scope.grid, cell);
                }
                if (ctrl.hasWon($scope.grid)) {
                    ctrl.win();
                }
            };

            ctrl.autoReveal = function (grid, cell) {
                ctrl.traverseNearbyCells(grid, cell.x, cell.y, function (nearCell) {
                    if (nearCell.hidden) {
                        nearCell.hidden = false;
                        if (nearCell.nearby === 0) {
                            ctrl.autoReveal(grid, nearCell);
                        }
                    }
                });
            };

            ctrl.traverseGrid = function (grid, fn) {
                angular.forEach(grid, function (row) {
                    angular.forEach(row, function (cell) {
                        fn(cell);
                    });
                });
            };

            ctrl.revealAll = function (grid) {
                ctrl.traverseGrid(grid, function (cell) {
                    cell.hidden = false;
                });
            };

            ctrl.hasWon = function (grid) {
                var won = true;
                ctrl.traverseGrid(grid, function (cell) {
                    if (cell.hidden && !cell.mine) {
                        won = false;
                    }
                });
                return won;
            };

            ctrl.addMines = function (grid, mineCount) {
                var laid = 0,
                    cell;

                var incrementNearby = function (cell) {
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
            
            ctrl.getTime = function () {
                return +new Date();
            };

            $scope.resetGrid = function () {
                $scope.grid = ctrl.createGrid($scope.gridWidth, $scope.gridHeight);
                ctrl.addMines($scope.grid, $scope.mineCount);
                $scope.startTime = ctrl.getTime();
            };

            $scope.gridWidth = 8;
            $scope.gridHeight = 8;
            $scope.mineCount = 10;
            $scope.wins = 0;
            $scope.losses = 0;
            $scope.bestTime = 15 * 60 * 1000; // 15 minutes in milliseconds
            $scope.showStartForm = true;
            $scope.showGrid = false;

            $scope.startGame = function (){
                $scope.showStartForm = false;
                $scope.showGrid = true;
                $scope.resetGrid();
            };

            $scope.newGame = function (){
                $scope.showStartForm = true;
                $scope.showGrid = false;
            };
        }
    ]);
