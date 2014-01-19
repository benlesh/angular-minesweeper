namespace MinesweeperServer.Tests
{
    public class TestableMinesweeperHub : MinesweeperHub
    {
        public TestableMinesweeperHub()
        {
            Clients.All = new MockClientsAll();
        }
    }
}