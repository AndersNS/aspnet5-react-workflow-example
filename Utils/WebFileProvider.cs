using System;
using Microsoft.AspNet.FileProviders;
using System.Net.Http;
using System.IO;
using Microsoft.Extensions.Primitives;

namespace AspnetWorkflowTest
{
    public class WebFileProvider : Microsoft.AspNet.FileProviders.IFileProvider
    {
        private readonly string _baseUrl;

        public WebFileProvider(string baseUrl)
        {
            _baseUrl = baseUrl;
        }

        public IDirectoryContents GetDirectoryContents(string subpath)
        {
            throw new NotImplementedException();
        }

        public IFileInfo GetFileInfo(string subpath)
        {
            using (var client = new HttpClient())
            {
                var array = client.GetByteArrayAsync(_baseUrl + subpath).Result;

                if (array != null)
                    return new WebFileInfo(array, true, subpath);
                else
                    return new WebFileInfo(null, false, subpath);
            }
        }

        public IChangeToken Watch(string filter)
        {
            throw new NotImplementedException();
        }
    }

    public class WebFileInfo : IFileInfo
    {
        private readonly byte[] _content;
        private readonly string _fullPath;
        private readonly string _name;

        public WebFileInfo(byte[] content, bool exists, string name)
        {
            _content = content;
            Exists = exists;
            _name = name;
        }

        public bool Exists { get; private set; }

        public bool IsDirectory { get { return false; } }

        public DateTimeOffset LastModified { get { return new DateTimeOffset(DateTime.Now); }}

        public long Length {get { return _content.Length; }}

        public string Name { get { return _name; }}

        public string PhysicalPath { get { return ""; }}

        public Stream CreateReadStream() { return new MemoryStream(_content); }}
}
