describe('minesweeper MultiplayerGameCtrl', function () {
    var ctrl,
        $rootScope,
        minesweeperServer,
        $scope;

    beforeEach(function () {
        module('minesweeper');

        inject(function (_$rootScope_, $controller) {
            $rootScope = _$rootScope_;
            $scope = $rootScope.$new();

            spyOn($scope, '$on').andCallThrough();

            minesweeperServer = {
                sendPlayerList: jasmine.createSpy('minesweeperServer.sendPlayerList')
            };

            ctrl = $controller('MultiplayerGameCtrl', {
                $scope: $scope,
                minesweeperServer: minesweeperServer
            });
        });
    });

    it('should wire up the "minesweeper:playerList" event', function () {
        expect($scope.$on).toHaveBeenCalledWith('minesweeper:playerList', ctrl.onPlayerList);
    });

    describe('onPlayerList', function () {
        var playerList;

        beforeEach(function () {
            playerList = [
                { id: 1, name: 'foo'},
                { id: 2, name: 'bar'}
            ];
            ctrl.onPlayerList(null, playerList);
        });

        it('should set $scope.players', function () {
            expect($scope.players).toBe(playerList);
        });
    });
});