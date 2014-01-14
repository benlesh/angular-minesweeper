using System;
using System.Collections.Generic;
using System.Collections.Specialized;
using System.Security.Principal;
using Microsoft.AspNet.SignalR;

namespace MinesweeperServer.Tests
{
    public class MockRequest : IRequest
    {
        public Uri Url { get; set; }
        public NameValueCollection QueryString { get; set; }
        public NameValueCollection Headers { get; set; }
        public NameValueCollection Form { get; set; }
        public IDictionary<string, Cookie> Cookies { get; set; }
        public IPrincipal User { get; set; }
        public IDictionary<string, object> Items { get; set; }
    }
}