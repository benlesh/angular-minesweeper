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

        [SetUp]
        public void SetUp()
        {
            _hub = new TestableMinesweeperHub();
        }

        [Test]
        public void PingPongTest()
        {
            _hub.Ping();
            Assert.That(_hub.Clients.All.onServerMessageCalledWith, Is.EqualTo("Pong!"));
            Assert.That(_hub.Clients.All.onServerMessageCallCount, Is.EqualTo(0));
        }
    }

    public class MockClientsAll
    {
        public string onServerMessageCalledWith;
        public int onServerMessageCallCount = 0;

        public void onServerMessage(string message)
        {
            onServerMessageCalledWith = message;
            onServerMessageCallCount++;
        }
    }

    public class TestableMinesweeperHub : MinesweeperHub
    {
        public TestableMinesweeperHub()
        {
            Clients.All = new MockClientsAll();
        }
    }
}
