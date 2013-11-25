describe('minesweeper MineSweeperCtrl', function (){
    var mineSweeperCtrl,
        $scope;

    beforeEach(function (){
        module('minesweeper');

        inject(function($rootScope, $controller) {
            $scope = $rootScope.$new();
            mineSweeperCtrl = $controller('MineSweeperCtrl', {
                $scope: $scope
            });
        });
    });

    describe('in ctor', function () {
        it('should set $scope.gridWidth', function(){
            expect($scope.gridWidth).toBe(20);
        });

        it('should set $scope.gridHeight', function () {
            expect($scope.gridHeight).toBe(20);
        });

        it('should set $scope.grid', function () {
            expect(Object.prototype.toString.call($scope.grid)).toBe('[object Array]');
            expect(Object.prototype.toString.call($scope.grid[0])).toBe('[object Array]');
        });
    });

    describe('createGrid(width, height)', function () {
        var grid,
            width,
            height;

        beforeEach(function (){
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
            for(i = 0; i < grid.length; i++) {
                expect(grid[i].length).toBe(width);
            }
        });
    });
});