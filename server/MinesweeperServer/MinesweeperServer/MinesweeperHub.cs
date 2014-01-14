using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Microsoft.AspNet.SignalR;

namespace MinesweeperServer
{
    public class MinesweeperHub : Hub
    {
        public static readonly Dictionary<string, MinesweeperUser> UserList = new Dictionary<string, MinesweeperUser>();

        public void Ping()
        {
            Clients.All.onServerMessage("Pong!");
        }

        public override System.Threading.Tasks.Task OnConnected()
        {
            UserList.Add(Context.ConnectionId, new MinesweeperUser
                {
                    ConnectionId = Context.ConnectionId,
                    Name = "Anonymous"
                });
            SendUserList();
            return base.OnConnected();
        }

        public override System.Threading.Tasks.Task OnDisconnected()
        {
            if (UserList.ContainsKey(Context.ConnectionId))
            {
                UserList.Remove(Context.ConnectionId);
            }
            SendUserList();
            return base.OnDisconnected();
        }

        public void SendUserList()
        {
            Clients.All.onUserList(UserList.Values);
        }

        public void SetName(string name)
        {
            var connectionId = Context.ConnectionId;
            MinesweeperUser user;
            if (UserList.TryGetValue(connectionId, out user))
            {
                user.Name = name;
                SendUserList();
            }
        }
    }
}