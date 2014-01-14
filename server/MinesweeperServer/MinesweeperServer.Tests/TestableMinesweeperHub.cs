using Microsoft.AspNet.SignalR.Hubs;

namespace MinesweeperServer.Tests
{
    public class TestableMinesweeperHub : MinesweeperHub
    {
        public TestableMinesweeperHub(string connectionId) :
            base()
        {
            var request = new MockRequest();
            Clients.All = new MockClientsAll();
            Context = new HubCallerContext(request, connectionId);
        }
    }
}