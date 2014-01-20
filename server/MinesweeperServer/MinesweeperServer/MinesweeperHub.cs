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

        public virtual void SendPlayerList() {
            Clients.All.onPlayerList(PlayerList.Values.ToArray());
        }

        public void SetName(string name) {
            Player player;
            if (PlayerList.TryGetValue(Context.ConnectionId, out player)) {
                lock (player) {
                    player.Name = name;
                }
                SendPlayerList();
            }
        }

        public void UpdateGrid(IEnumerable<IEnumerable<bool>> grid) {
            Player player;
            if (PlayerList.TryGetValue(Context.ConnectionId, out player))
            {
                lock (player) {
                    player.Grid = grid;
                }
                SendPlayerList();
            }
        }
    }

    public class Player {
        public readonly string ConnectionId ;
        public string Name { get; set; }
        public IEnumerable<IEnumerable<bool>> Grid { get; set; } 

        public Player(string connectionId) {
            ConnectionId = connectionId;
            Name = "Anonymous";
        }
    }
}