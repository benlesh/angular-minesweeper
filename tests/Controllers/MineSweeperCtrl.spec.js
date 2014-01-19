describe('minesweeper MineSweeperCtrl', function () {
    var mineSweeperCtrl,
        mockWindow,
        $scope;

    beforeEach(function () {
        module('minesweeper');

        inject(function ($rootScope, $controller) {
            var r = 0;

            $scope = $rootScope.$new();

            mockWindow = {
                Math: {
                    random: Math.random,
                    floor: Math.floor,
                    min: Math.min,
                    max: Math.max
                }
            };

            mineSweeperCtrl = $controller('MineSweeperCtrl', {
                $scope: $scope,
                $window: mockWindow
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

        it('should set $scope.grid', function () {
            expect(Object.prototype.toString.call($scope.grid)).toBe('[object Array]');
            expect(Object.prototype.toString.call($scope.grid[0])).toBe('[object Array]');
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

    describe('$scope.reveal(cell)', function (){
        var cell;

        beforeEach(function (){
            cell = {
                hidden: true
            };
            $scope.reveal(cell);
        });

        it('should set cell.hidden to false', function () {
            expect(cell.hidden).toBe(false);
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
});