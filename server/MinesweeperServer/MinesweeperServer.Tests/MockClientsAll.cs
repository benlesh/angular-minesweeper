using System.Collections.Generic;

namespace MinesweeperServer.Tests
{
    public class MockClientsAll
    {
        public string onServerMessageCalledWith;
        public int onServerMessageCallCount = 0;
        public IEnumerable<Player> onPlayerListCalledWith;

        public void onServerMessage(string message)
        {
            onServerMessageCalledWith = message;
            onServerMessageCallCount++;
        }

        public void onPlayerList(IEnumerable<Player> playerList) {
            onPlayerListCalledWith = playerList;
        }
    }
}