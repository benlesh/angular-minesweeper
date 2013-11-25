describe('minesweeper.js module', function () {
    var minesweeper;

    beforeEach(function (){
        minesweeper = angular.module('minesweeper');
    });

    it('should exist', function () {
        expect(minesweeper).toBeTruthy();
    });
});