using System;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using NUnit.Framework;

namespace MinesweeperServer.Tests
{
    [TestFixture]
    public class MinesweeperHubTests
    {
        private TestableMinesweeperHub _hub;
        private const string _connectionId = "MY CONNECTION ID";
        private ConcurrentDictionary<string, Player> PlayerList;

        [SetUp]
        public void SetUp()
        {
            _hub = new TestableMinesweeperHub(_connectionId);
            PlayerList = TestableMinesweeperHub.PlayerList;
            PlayerList.Clear();
        }

        [Test]
        public void PingPongTest()
        {
            _hub.Ping();
            Assert.That(_hub.Clients.All.onServerMessageCalledWith, Is.EqualTo("Pong!"));
            Assert.That(_hub.Clients.All.onServerMessageCallCount, Is.EqualTo(1));
        }

        [Test]
        public void SendPlayerListTest() {
            _hub.SendPlayerList();
            Assert.That(_hub.Clients.All.onPlayerListCalledWith, Is.EquivalentTo(TestableMinesweeperHub.PlayerList.Values));
        }

        [Test]
        public void OnConnectedTest() {
            Assert.That(PlayerList.Count, Is.EqualTo(0));
            _hub.OnConnected();
            Assert.That(PlayerList.Count, Is.EqualTo(1));
            Assert.That(PlayerList[_connectionId], Is.Not.Null);
            Assert.That(PlayerList[_connectionId].Name, Is.EqualTo("Anonymous"));
            Assert.That(PlayerList[_connectionId].ConnectionId, Is.EqualTo(_connectionId));
            Assert.That(_hub.SendPlayerListCalled, Is.EqualTo(1));
        }

        [Test]
        public void OnDisconnectedTest() {
            PlayerList.AddOrUpdate(_connectionId, (connId) => new Player(connId), (connId, plyr) => plyr);
            Assert.That(PlayerList.Count, Is.EqualTo(1));
            _hub.OnDisconnected();
            Assert.That(PlayerList.Count, Is.EqualTo(0));
            Player player;
            Assert.That(PlayerList.TryGetValue(_connectionId, out player), Is.False);
            Assert.That(_hub.SendPlayerListCalled, Is.EqualTo(1));
        }

        [Test]
        public void SetNameTest() {
            PlayerList.AddOrUpdate(_connectionId, (connId) => new Player(connId), (connId, plyr) => plyr);
            _hub.SetName("New Name");
            Assert.That(PlayerList[_connectionId].Name, Is.EqualTo("New Name"));
            Assert.That(_hub.SendPlayerListCalled, Is.EqualTo(1));
        }

        [Test]
        public void UpdateGridTest()
        {
            PlayerList.AddOrUpdate(_connectionId, (connId) => new Player(connId), (connId, plyr) => plyr);
            var grid = new List<List<bool>>();
            _hub.UpdateGrid(grid);
            Assert.That(PlayerList[_connectionId].Grid, Is.EqualTo(grid));
            Assert.That(_hub.SendPlayerListCalled, Is.EqualTo(1));
        }
    }
}
