using System;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Microsoft.AspNet.SignalR;

namespace MinesweeperServer
{
    public class MinesweeperHub : Hub
    {
        public static readonly ConcurrentDictionary<string, Player> PlayerList = new ConcurrentDictionary<string, Player>(); 

        public void Ping()
        {
            Clients.All.onServerMessage("Pong!");
        }

        public override System.Threading.Tasks.Task OnConnected() {
            PlayerList.AddOrUpdate(Context.ConnectionId, (cid) => new Player(cid), (cid, plyr) => plyr);
            SendPlayerList();
            return base.OnConnected();
        }


        public override System.Threading.Tasks.Task OnDisconnected() {
            Player removed;
            PlayerList.TryRemove(Context.ConnectionId, out removed);
            SendPlayerList();
            return base.OnDisconnected();
        }

        public void SendPlayerList() {
            Clients.All.onPlayerList(PlayerList.Values.ToArray());
        }
    }

    public class Player {
        public readonly string ConnectionId ;
        public string Name { get; set; }

        public Player(string connectionId) {
            ConnectionId = connectionId;
            Name = "Anonymous";
        }
    }
}