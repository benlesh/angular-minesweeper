using System.Collections.Generic;

namespace MinesweeperServer.Tests
{
    public class MockClientsAll
    {
        public string onServerMessageCalledWith;
        public int onServerMessageCallCount = 0;
        public IEnumerable<MinesweeperUser> onUserListCalledWith;

        public void onServerMessage(string message)
        {
            onServerMessageCalledWith = message;
            onServerMessageCallCount++;
        }

        public void onUserList(IEnumerable<MinesweeperUser> userList)
        {
            onUserListCalledWith = userList;
        }
    }
}