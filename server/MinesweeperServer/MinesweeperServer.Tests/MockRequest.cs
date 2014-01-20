using System;
using System.Collections.Generic;
using System.Collections.Specialized;
using System.Security.Principal;
using Microsoft.AspNet.SignalR;

namespace MinesweeperServer.Tests
{
    public class MockRequest : IRequest
    {
        public Uri Url { get; private set; }
        public NameValueCollection QueryString { get; private set; }
        public NameValueCollection Headers { get; private set; }
        public NameValueCollection Form { get; private set; }
        public IDictionary<string, Cookie> Cookies { get; private set; }
        public IPrincipal User { get; private set; }
        public IDictionary<string, object> Items { get; private set; }
    }
}