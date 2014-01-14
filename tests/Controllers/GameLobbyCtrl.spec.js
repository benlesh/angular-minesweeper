describe('minesweeper GameLobbyCtrl', function () {
    var gameLobbyCtrl,
        minesweeperServer,
        $scope;

    beforeEach(function () {
        module('minesweeper');

        inject(function ($rootScope, $controller) {
            $scope = $rootScope.$new();

            spyOn($scope, '$on').andCallThrough();

            minesweeperServer = {
                setName: jasmine.createSpy('minesweeperServer.setName'),
                sendUserList: jasmine.createSpy('minesweeperServer.sendUserList')
            };
            gameLobbyCtrl = $controller('GameLobbyCtrl', {
                $scope: $scope,
                minesweeperServer: minesweeperServer
            });
        });
    });

    it('should set up $scope.$on for userList handling', function () {
        expect($scope.$on).toHaveBeenCalledWith('minesweeper:userList', gameLobbyCtrl.userListHandler);
    });

    describe('userListHandler(e, userList)', function () {
        var userList;

        beforeEach(function () {
            userList = [
                { ConnectionId: 1, Name: 'One' },
                { ConnectionId: 2, Name: 'Two' }
            ];
            $scope.users = null;
            gameLobbyCtrl.userListHandler(null, userList);
        });

        it('should set $scope.users', function () {
            expect($scope.users).toBe(userList);
        });
    });

    describe('$scope.changeName() when $scope.name = "Test Dummy"', function () {
        beforeEach(function (){
            $scope.name = 'Test Dummy';
            $scope.changeName();
        });

        it('should call minesweeperServer.setName("Test Dummy")', function () {
            expect(minesweeperServer.setName).toHaveBeenCalledWith('Test Dummy');
        });
    });

    describe('$scope.refreshUsers()', function () {
        beforeEach(function (){
            $scope.refreshUsers();
        });

        it('should call minesweeperServer.sendUserList()', function () {
            expect(minesweeperServer.sendUserList).toHaveBeenCalled();
        });
    });
});