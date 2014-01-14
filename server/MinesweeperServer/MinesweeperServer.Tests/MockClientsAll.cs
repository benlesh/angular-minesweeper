namespace MinesweeperServer.Tests
{
    public class MockClientsAll
    {
        public string onServerMessageCalledWith;
        public int onServerMessageCallCount = 0;

        public void onServerMessage(string message)
        {
            onServerMessageCalledWith = message;
            onServerMessageCallCount++;
        }
    }
}