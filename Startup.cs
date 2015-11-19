using System;
using Microsoft.AspNet.Builder;
using Microsoft.AspNet.Hosting;
using Microsoft.AspNet.Http;
using Microsoft.AspNet.StaticFiles;
using Microsoft.Extensions.DependencyInjection;

namespace AspnetWorkflowTest
{
    public class Startup
    {
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddMvc();
        }

        public void ConfigureDevelopment(IApplicationBuilder app)
        {
            // Use JS files from webpack-dev-server while developing
            app.UseStaticFiles(new StaticFileOptions()
            {
                FileProvider = new WebFileProvider("http://localhost:8080/js"),
                RequestPath = new PathString("/js")
            });

            Configure(app);
        }

        public void Configure(IApplicationBuilder app)
        {
            app.UseStaticFiles();

            app.UseMvc();
        }
    }
}
