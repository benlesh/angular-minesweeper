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
                    floor: Math.floor
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
                angular.forEach(grid, function(row) {
                    angular.forEach(row, function(cell) {
                        if(cell.mine) {
                            found++;
                        }
                    });
                });

                expect(found).toBe(mineCount);
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