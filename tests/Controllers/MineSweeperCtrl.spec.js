describe('minesweeper MineSweeperCtrl', function () {
    var mineSweeperCtrl,
        mockWindow,
        $timeout,
        $scope;

    beforeEach(function () {
        module('minesweeper');

        inject(function ($rootScope, $controller) {
            var r = 0;

            $scope = $rootScope.$new();

            $timeout = jasmine.createSpy('$timeout').andCallFake(function (fn, delay) {
                window.setTimeout(fn, delay);
                $scope.$apply();
            });

            mockWindow = {
                Math: {
                    random: Math.random,
                    floor: Math.floor,
                    min: Math.min,
                    max: Math.max
                },
                alert: jasmine.createSpy('$window.alert')
            };

            mineSweeperCtrl = $controller('MineSweeperCtrl', {
                $scope: $scope,
                $window: mockWindow,
                $timeout: $timeout
            });
        });
    });

    describe('in ctor', function () {
        it('should set $scope.gridWidth', function () {
            expect($scope.gridWidth).toBeGreaterThan(2);
        });

        it('should set $scope.gridHeight', function () {
            expect($scope.gridHeight).toBeGreaterThan(2);
        });

        it('should set $scope.showStartForm', function () {
            expect($scope.showStartForm).toBe(true);
        });

        it('should set $scope.showGrid', function () {
            expect($scope.showGrid).toBe(false);
        });
    });

    describe('traverseNearbyCells(grid, originX, originY, fn)', function () {
        var grid,
            cellsTraversed;

        beforeEach(function () {
            grid = mineSweeperCtrl.createGrid(5, 5);
            cellsTraversed = [];
        });

        describe('when origin is 0, 0 on a 5 x 5 grid', function () {
            beforeEach(function () {
                mineSweeperCtrl.traverseNearbyCells(grid, 0, 0, function (cell) {
                    cellsTraversed.push(cell);
                });
            });

            it('should only traverse 3 cells', function () {
                expect(cellsTraversed.length).toBe(3);
            });
        });


        describe('when origin is 2, 2 on a 5 x 5 grid', function () {
            beforeEach(function () {
                mineSweeperCtrl.traverseNearbyCells(grid, 2, 2, function (cell) {
                    cellsTraversed.push(cell);
                });
            });

            it('should traverse 8 cells', function () {
                expect(cellsTraversed.length).toBe(8);
            });
        });


        describe('when origin is 4, 4 on a 5 x 5 grid', function () {
            beforeEach(function () {
                mineSweeperCtrl.traverseNearbyCells(grid, 4, 4, function (cell) {
                    cellsTraversed.push(cell);
                });
            });

            it('should only traverse 3 cells', function () {
                expect(cellsTraversed.length).toBe(3);
            });
        });
    });


    describe('addMines(grid, mineCount)', function () {
        var grid,
            mineCount,
            found;

        describe('when called with a mineCount of 5', function () {
            beforeEach(function () {
                var c = 0;
                spyOn(mineSweeperCtrl, 'getRandomCell').andCallFake(function (grid) {
                    return [
                        grid[0][0],
                        grid[1][1],
                        grid[2][2],
                        grid[3][3],
                        grid[1][1], //duplicate!
                        grid[4][4]
                    ][c++];
                });
                found = 0;
                mineCount = 5;
                grid = mineSweeperCtrl.createGrid(10, 10);

                mineSweeperCtrl.addMines(grid, mineCount);
            });

            it('should set exactly 5 mines', function () {
                angular.forEach(grid, function (row) {
                    angular.forEach(row, function (cell) {
                        if (cell.mine) {
                            found++;
                        }
                    });
                });

                expect(found).toBe(mineCount);
            });

            describe('and we know (0,0), (1,1) and (2,2) are mines', function () {
                it('should increment the nearby values of adjacent cells appropriately', function () {
                    // remember: grid[y][x]! These numbers were obtained for testing
                    // the old fashioned way: pen and paper, drawing the grid. ;)
                    expect(grid[0][0].nearby).toBe(1);
                    expect(grid[1][0].nearby).toBe(2);
                    expect(grid[2][0].nearby).toBe(1);
                    expect(grid[0][1].nearby).toBe(2);
                    expect(grid[1][1].nearby).toBe(2);
                    expect(grid[2][1].nearby).toBe(2);
                    expect(grid[0][2].nearby).toBe(1);
                    expect(grid[1][2].nearby).toBe(2);
                    expect(grid[2][2].nearby).toBe(2);
                    expect(grid[3][0].nearby).toBe(0);
                });
            });
        });
    });

    describe('getRandomCell(grid)', function () {
        var grid,
            cell;

        beforeEach(function () {
            grid = mineSweeperCtrl.createGrid(10, 10);
        });

        describe('when Math.random() returns .5 every time', function () {
            beforeEach(function () {
                mockWindow.Math.random = jasmine.createSpy('Math.random').andReturn(0.5);
                cell = mineSweeperCtrl.getRandomCell(grid);
            });

            it('should return the cell from 5, 5', function () {
                expect(cell.x).toBe(5);
                expect(cell.y).toBe(5);
            });
        });

        describe('when Math.random() returns .9 every time', function () {
            beforeEach(function () {
                mockWindow.Math.random = jasmine.createSpy('Math.random').andReturn(0.9);
                cell = mineSweeperCtrl.getRandomCell(grid);
            });

            it('should return the cell from 9, 9', function () {
                expect(cell.x).toBe(9);
                expect(cell.y).toBe(9);
            });
        });
    });

    describe('traverseGrid(grid)', function () {
        var grid, traversalFn, cellsPassed;
        beforeEach(function () {
            cellsPassed = [];

            traversalFn = function (cell) {
                cellsPassed.push(cell);
            };

            grid = mineSweeperCtrl.createGrid(10, 10);
            mineSweeperCtrl.traverseGrid(grid, traversalFn);
        });

        it('should call the traversalFn 100 times for a 10 x 10 grid', function () {
            expect(cellsPassed.length).toBe(100);
        });

        it('should pass the cells to the traversal function', function () {
            var y, x, i;
            i = 0;
            for (y = 0; y < grid.length; y++) {
                for (x = 0; x < grid[y].length; x++) {
                    expect(cellsPassed[i++]).toBe(grid[y][x]);
                }
            }
        });
    });

    describe('revealAll(grid)', function () {
        var grid;

        beforeEach(function () {
            grid = mineSweeperCtrl.createGrid(5, 5);
            mineSweeperCtrl.traverseGrid(grid, function (cell) {
                cell.hidden = true;
            });

            mineSweeperCtrl.revealAll(grid);
        });

        it('should set all cells to hidden === false', function () {
            var allVisible = true;
            mineSweeperCtrl.traverseGrid(grid, function (cell) {
                if (cell.hidden) {
                    allVisible = false;
                }
            });
            expect(allVisible).toBe(true);
        });
    });

    describe('hasWon()', function () {
        var grid,
            result;

        beforeEach(function () {
            grid = $scope.grid = mineSweeperCtrl.createGrid(10, 10);
            mineSweeperCtrl.addMines($scope.grid, 4);
            result = false;
        });

        describe('when all non-mines are not hidden', function () {
            beforeEach(function () {
                angular.forEach(grid, function (row) {
                    angular.forEach(row, function (cell) {
                        if (!cell.mine) {
                            cell.hidden = false;
                        }
                    });
                });

                result = mineSweeperCtrl.hasWon(grid);
            });

            it('should return true', function () {
                expect(result).toBe(true);
            });
        });

        describe('when one or more non-mines are still hidden', function () {
            beforeEach(function () {
                // reveal all cells that aren't mines.
                angular.forEach(grid, function (row) {
                    angular.forEach(row, function (cell) {
                        if (!cell.mine) {
                            cell.hidden = false;
                        }
                    });
                });

                // find a cell that's not a mine and set hide it again.
                var cell;
                while (!cell || cell.mine) {
                    cell = mineSweeperCtrl.getRandomCell(grid);
                }
                cell.hidden = true;

                result = mineSweeperCtrl.hasWon(grid);
            });

            it('should return false', function () {
                expect(result).toBe(false);
            });
        });
    });

    describe('$scope.resetGrid()', function () {
        var originalStartTime;

        beforeEach(function () {
            $scope.grid = null;
            $scope.gridWidth = 20;
            $scope.gridHeight = 20;
            $scope.mineCount = 21;
            originalStartTime = $scope.startTime = new Date(2013, 0, 1);

            spyOn(mineSweeperCtrl, 'getTime').andReturn(123456);
            spyOn(mineSweeperCtrl, 'createGrid').andCallThrough();
            spyOn(mineSweeperCtrl, 'addMines').andCallThrough();

            $scope.resetGrid();
        });

        it('should call createGrid()', function () {
            expect(mineSweeperCtrl.createGrid).toHaveBeenCalledWith(20, 20);
        });

        it('should call addMines()', function () {
            expect(mineSweeperCtrl.addMines).toHaveBeenCalledWith($scope.grid, 21);
        });

        it('should update $scope.startTime', function () {
            expect(+$scope.startTime).toBe(123456);
        });
    });

    describe('showWin()', function () {
        beforeEach(function () {
            spyOn($scope, 'resetGrid');
            $scope.grid = mineSweeperCtrl.createGrid(2, 2);
            spyOn(mineSweeperCtrl, 'revealAll');
            mineSweeperCtrl.win();
            mineSweeperCtrl.showWin();
        });

        it('should alert the user', function () {
            expect(mockWindow.alert).toHaveBeenCalledWith('you win!');
        });

        it('should call $scope.resetGrid()', function () {
            expect($scope.resetGrid).toHaveBeenCalled();
        });
    });

    describe('showLoss()', function () {
        beforeEach(function () {
            spyOn($scope, 'resetGrid');
            mineSweeperCtrl.showLoss();
        });

        it('should alert the user', function () {
            expect(mockWindow.alert).toHaveBeenCalledWith('you lose!');
        });

        it('should call $scope.resetGrid()', function () {
            expect($scope.resetGrid).toHaveBeenCalled();
        });
    });

    describe('win()', function () {
        beforeEach(function () {
            $scope.wins = 3;
            $scope.grid = mineSweeperCtrl.createGrid(2, 2);
            spyOn(mineSweeperCtrl, 'revealAll');
            spyOn(mineSweeperCtrl, 'showWin');
            mineSweeperCtrl.win();
        });

        it('should call showWin() on a $timeout', function () {
            expect($timeout).toHaveBeenCalledWith(mineSweeperCtrl.showWin);
        });

        it('should increment $scope.wins', function () {
            expect($scope.wins).toBe(4);
        });

        describe('when total time is less than $scope.bestTime', function () {
            beforeEach(function () {
                spyOn(mineSweeperCtrl, 'getTime').andReturn(1234);
                $scope.bestTime = 10000000;
                $scope.startTime = 0;
                mineSweeperCtrl.win();
            });

            it('should update $scope.bestTime', function () {
                expect($scope.bestTime).toBe(1234);
            });
        });

        describe('when total time is greater than $scope.bestTime', function () {
            beforeEach(function () {
                $scope.bestTime = -1000; // negative time is my favorite!
                $scope.startTime = new Date();
                mineSweeperCtrl.win();
            });

            it('should not update $scope.bestTime', function () {
                expect($scope.bestTime).toBe(-1000);
            });

            it('should call revealAll($scope.grid)', function () {
                expect(mineSweeperCtrl.revealAll).toHaveBeenCalledWith($scope.grid);
            });

            it('should call revealAll($scope.grid)', function () {
                expect(mineSweeperCtrl.revealAll).toHaveBeenCalledWith($scope.grid);
            });
        });
    });

    describe('lose()', function () {
        beforeEach(function () {
            $scope.losses = 4;
            $scope.grid = mineSweeperCtrl.createGrid(2, 2);
            spyOn(mineSweeperCtrl, 'revealAll');
            mineSweeperCtrl.lose();
        });

        it('should call showLoss() on a $timeout', function () {
            expect($timeout).toHaveBeenCalledWith(mineSweeperCtrl.showLoss);
        });

        it('should increment $scope.losses', function () {
            expect($scope.losses).toBe(5);
        });

        it('should call revealAll($scope.grid)', function () {
            expect(mineSweeperCtrl.revealAll).toHaveBeenCalledWith($scope.grid);
        });
    });

    describe('$scope.newGame()', function () {
        beforeEach(function (){
            $scope.showGrid = true;
            $scope.showStartForm = false;
            $scope.newGame();
        });

        it('should set $scope.showGrid to false', function () {
            expect($scope.showGrid).toBe(false);
        });

        it('should set $scope.showStartForm to true', function () {
            expect($scope.showStartForm).toBe(true);
        });
    });

    describe('$scope.startGame()', function () {
        beforeEach(function () {
            $scope.showGrid = false;
            $scope.showStartForm = true;
            spyOn($scope, 'resetGrid').andCallThrough();
            $scope.startGame();
        });

        it('should set $scope.showGrid to true', function () {
            expect($scope.showGrid).toBe(true);
        });

        it('should set $scope.showStartForm to false', function () {
            expect($scope.showStartForm).toBe(false);
        });

        it('should call $scope.resetGrid()', function () {
            expect($scope.resetGrid).toHaveBeenCalled();
        });
    });

    describe('autoReveal(grid, cell)', function () {
        var grid, cell;

        beforeEach(function () {
            grid = mineSweeperCtrl.createGrid(5, 5);
            // add a mines in specific spots

            /* C = clicked, M = mine
             C 0 2 M 2
             0 0 3 M 3
             2 3 5 M 3
             M M M M 2
             2 3 3 2 1
             */
            grid[3][0].mine = true;
            grid[3][1].mine = true;
            grid[3][2].mine = true;
            grid[3][3].mine = true;
            grid[2][3].mine = true;
            grid[1][3].mine = true;
            grid[0][3].mine = true;

            grid[0][2].nearby = 2;
            grid[1][2].nearby = 3;
            grid[2][2].nearby = 5;
            grid[2][1].nearby = 3;
            grid[2][0].nearby = 2;
            grid[0][4].nearby = 2;
            grid[1][4].nearby = 3;
            grid[2][4].nearby = 3;
            grid[3][4].nearby = 2;
            grid[4][4].nearby = 1;
            grid[4][3].nearby = 2;
            grid[4][2].nearby = 3;
            grid[4][1].nearby = 3;
            grid[4][0].nearby = 2;

            cell = grid[0][0];
            mineSweeperCtrl.autoReveal(grid, cell);
        });

        it('should reveal the proper cells', function () {
            expect(grid[0][1].hidden).toBe(false);
            expect(grid[0][2].hidden).toBe(false);
            expect(grid[1][0].hidden).toBe(false);
            expect(grid[1][1].hidden).toBe(false);
            expect(grid[1][2].hidden).toBe(false);
            expect(grid[2][0].hidden).toBe(false);
            expect(grid[2][1].hidden).toBe(false);
            expect(grid[2][2].hidden).toBe(false);
        });

        it('should not reveal other cells', function () {
            expect(grid[3][0].hidden).toBe(true);
            expect(grid[3][1].hidden).toBe(true);
            expect(grid[3][2].hidden).toBe(true);
            expect(grid[3][3].hidden).toBe(true);
            expect(grid[2][3].hidden).toBe(true);
            expect(grid[1][3].hidden).toBe(true);
            expect(grid[0][3].hidden).toBe(true);
            expect(grid[4][0].hidden).toBe(true);
            expect(grid[4][1].hidden).toBe(true);
            expect(grid[4][2].hidden).toBe(true);
            expect(grid[4][3].hidden).toBe(true);
            expect(grid[4][4].hidden).toBe(true);
            expect(grid[4][4].hidden).toBe(true);
            expect(grid[3][4].hidden).toBe(true);
            expect(grid[2][4].hidden).toBe(true);
            expect(grid[1][4].hidden).toBe(true);
            expect(grid[0][4].hidden).toBe(true);
        });
    });

    describe('$scope.reveal(cell)', function () {
        var cell;

        beforeEach(function () {
            $scope.grid = mineSweeperCtrl.createGrid(5, 5);
            // add a mines in specific spots

            /* C = clicked, M = mine, 0 = not mine
             C 0 0 M 0
             0 0 0 M 0
             0 0 0 M 0
             M M M M 0
             0 0 0 0 0
             */
            $scope.grid[3][0].mine = true;
            $scope.grid[3][1].mine = true;
            $scope.grid[3][2].mine = true;
            $scope.grid[3][3].mine = true;
            $scope.grid[2][3].mine = true;
            $scope.grid[1][3].mine = true;
            $scope.grid[0][3].mine = true;
            spyOn(mineSweeperCtrl, 'autoReveal');
        });

        describe('when cell does not border a mine', function () {
            beforeEach(function () {
                cell = $scope.grid[0][0];
                $scope.reveal(cell);
            });

            it('should call autoReveal(cell)', function () {
                expect(mineSweeperCtrl.autoReveal).toHaveBeenCalledWith($scope.grid, cell);
            });
        });

        describe('when the cell is just hidden', function () {
            beforeEach(function () {
                $scope.grid = mineSweeperCtrl.createGrid(10, 10);
                cell = $scope.grid[3][3];
                cell.hidden = true;
                spyOn(mineSweeperCtrl, 'hasWon').andCallThrough();
                $scope.reveal(cell);
            });

            it('should set cell.hidden to false', function () {
                expect(cell.hidden).toBe(false);
            });

            it('should call hasWon($scope.grid)', function () {
                expect(mineSweeperCtrl.hasWon).toHaveBeenCalledWith($scope.grid);
            });
        });

        describe('when hasWon() returns true', function () {
            beforeEach(function () {
                $scope.grid = mineSweeperCtrl.createGrid(10, 10);
                cell = $scope.grid[0][0];
                spyOn(mineSweeperCtrl, 'hasWon').andReturn(true);
                spyOn(mineSweeperCtrl, 'win');
                $scope.reveal(cell);
            });

            it('should call win()', function () {
                expect(mineSweeperCtrl.win).toHaveBeenCalled();
            });
        });

        describe('when the cell has a mine', function () {
            beforeEach(function () {
                cell = {
                    mine: true
                };
                spyOn(mineSweeperCtrl, 'lose').andCallThrough();
                spyOn(mineSweeperCtrl, 'hasWon').andCallThrough();
                $scope.reveal(cell);
            });

            it('should fire lose()', function () {
                expect(mineSweeperCtrl.lose).toHaveBeenCalled();
            });

            it('should NOT fire hasWon($scope.grid)', function () {
                expect(mineSweeperCtrl.hasWon).not.toHaveBeenCalled();
            });
        });
    });

    describe('lose()', function () {
        it('should exist', function () {
            expect(typeof mineSweeperCtrl.lose).toBe('function');
        });
    });

    describe('createGrid(width, height)', function () {
        var grid,
            width,
            height;

        beforeEach(function () {
            width = 10;
            height = 20;
            grid = mineSweeperCtrl.createGrid(width, height);
        });

        it('should create an array of arrays', function () {
            expect(Object.prototype.toString.call(grid)).toBe('[object Array]');
            expect(Object.prototype.toString.call(grid[0])).toBe('[object Array]');
        });

        it('should have the outer array equal in length to the height', function () {
            expect(grid.length).toBe(height);
        });

        it('should have all inner arrays equal in length to the width', function () {
            var i;
            for (i = 0; i < grid.length; i++) {
                expect(grid[i].length).toBe(width);
            }
        });
    });

    describe('getTime()', function () {
        it('should get the current time', function () {
            expect(mineSweeperCtrl.getTime()).toBe(+new Date());
        });
    });
});