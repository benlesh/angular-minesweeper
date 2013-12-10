describe('minesweeper rightClick directive', function () {
    var elem, scope;

    beforeEach(function () {
        module('minesweeper');

        inject(function ($rootScope, $compile) {
            scope = $rootScope;
            scope.foo = 0;
            scope.bar = function () {
                scope.foo++;
            };

            elem = angular.element('<div right-click="bar()">{{foo}}</div>');
            $compile(elem)(scope);
            scope.$digest();
        });
    });

    it('should handle a right click', function () {
        elem.triggerHandler('contextmenu');
        expect(scope.foo).toBe(1);
    });
});