using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Microsoft.AspNet.SignalR;

namespace MinesweeperServer
{
    public class MinesweeperHub : Hub
    {
        public void Ping()
        {
            Clients.All.onServerMessage("Pong!");
        }
    }
}