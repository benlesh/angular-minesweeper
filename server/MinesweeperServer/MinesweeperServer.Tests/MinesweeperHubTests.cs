using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using NUnit.Framework;

namespace MinesweeperServer.Tests
{
    [TestFixture]
    public class MinesweeperHubTests
    {
        private MinesweeperHub _hub;
        private string _connectionId;

        [SetUp]
        public void SetUp()
        {
            _connectionId = "ABCDEF123456";
            _hub = new TestableMinesweeperHub(_connectionId);
        }

        [Test]
        public void PingPongTest()
        {
            _hub.Ping();
            Assert.That(_hub.Clients.All.onServerMessageCalledWith, Is.EqualTo("Pong!"));
            Assert.That(_hub.Clients.All.onServerMessageCallCount, Is.EqualTo(1));
        }

        [Test]
        public void OnConnectedTest()
        {
            _hub.Clients.All.onUserListCalledWith = null;
            _hub.OnConnected();

            Assert.That(_hub.UserList.Count, Is.EqualTo(1));
            Assert.That(_hub.UserList.Keys.First(), Is.EqualTo(_connectionId));
            Assert.That(_hub.UserList.Values.First().Name, Is.EqualTo("Anonymous"));

            AssertClientOnUserListCalled();
        }

        [Test]
        public void SendUserListTest()
        {
            _hub.UserList.Clear();
            _hub.UserList.Add("1", new MinesweeperUser { ConnectionId = "1", Name = "One" });
            _hub.UserList.Add("2", new MinesweeperUser { ConnectionId = "2", Name = "Two" });

            _hub.SendUserList();

            AssertClientOnUserListCalled();
        }

        [Test]
        public void SetNameTest()
        {
            _hub.UserList.Add(_connectionId, new MinesweeperUser { ConnectionId = _connectionId, Name = "Old Name" });
            _hub.SetName("Foobar Manchu");

            Assert.That(_hub.UserList[_connectionId].Name, Is.EqualTo("Foobar Manchu"));
            AssertClientOnUserListCalled();
        }

        private void AssertClientOnUserListCalled()
        {
            Assert.That(_hub.Clients.All.onUserListCalledWith, Is.EquivalentTo(_hub.UserList.Values));
        }
    }
}
