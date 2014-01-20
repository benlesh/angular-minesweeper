using Microsoft.AspNet.SignalR.Hubs;

namespace MinesweeperServer.Tests
{
    public class TestableMinesweeperHub : MinesweeperHub
    {
        public TestableMinesweeperHub(string connectionId)
        {
            var mockRequest = new MockRequest();
            Context = new HubCallerContext(mockRequest, connectionId);
            Clients.All = new MockClientsAll();
        }
    }
}