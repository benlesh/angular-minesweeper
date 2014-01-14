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
        private Dictionary<string, MinesweeperUser> _userList;

        [SetUp]
        public void SetUp()
        {
            _connectionId = "ABCDEF123456";
            _hub = new TestableMinesweeperHub(_connectionId);
            _userList = TestableMinesweeperHub.UserList;
            _userList.Clear();
        }

        [Test]
        public void PingPongTest()
        {
            _hub.Ping();
            Assert.That(_hub.Clients.All.onServerMessageCalledWith, Is.EqualTo("Pong!"));
            Assert.That(_hub.Clients.All.onServerMessageCallCount, Is.EqualTo(1));
        }

        [Test]
        public void ConnectionTest()
        {
            _hub.Clients.All.onUserListCalledWith = null;
            _hub.OnConnected();

            Assert.That(_userList.Count, Is.EqualTo(1));
            Assert.That(_userList.Keys.First(), Is.EqualTo(_connectionId));
            Assert.That(_userList.Values.First().Name, Is.EqualTo("Anonymous"));

            AssertClientOnUserListCalled();
        }

        [Test]
        public void DisconnectionTest()
        {
            _hub.Clients.All.onUserListCalledWith = null;
            _userList.Add(_connectionId, new MinesweeperUser
                {
                    ConnectionId = _connectionId,
                    Name = "Connected User"
                });

            Assert.That(_userList.Count, Is.EqualTo(1));

            _hub.OnDisconnected();

            Assert.That(_userList.Count, Is.EqualTo(0));

            AssertClientOnUserListCalled();
        }

        [Test]
        public void SendUserListTest()
        {
            _userList.Add("1", new MinesweeperUser { ConnectionId = "1", Name = "One" });
            _userList.Add("2", new MinesweeperUser { ConnectionId = "2", Name = "Two" });

            _hub.SendUserList();

            AssertClientOnUserListCalled();
        }

        [Test]
        public void SetNameTest()
        {
            TestableMinesweeperHub.UserList.Add(_connectionId, new MinesweeperUser { ConnectionId = _connectionId, Name = "Old Name" });
            _hub.SetName("Foobar Manchu");

            Assert.That(_userList[_connectionId].Name, Is.EqualTo("Foobar Manchu"));
            AssertClientOnUserListCalled();
        }

        private void AssertClientOnUserListCalled()
        {
            Assert.That(_hub.Clients.All.onUserListCalledWith, Is.EquivalentTo(_userList.Values));
        }
    }
}
