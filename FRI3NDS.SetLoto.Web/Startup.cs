using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Microsoft.AspNetCore.Http;
using FRI3NDS.SetLoto.Web.Infrastructure;
using NLog.Web;
using NLog.Extensions.Logging;
using Microsoft.AspNetCore.Antiforgery;

namespace FRI3NDS.SetLoto.Web
{
    public class Startup
    {
        public Startup(IHostingEnvironment env)
        {
            var builder = new ConfigurationBuilder()
                .SetBasePath(env.ContentRootPath)
                .AddJsonFile("appsettings.json", optional: false, reloadOnChange: true)
                .AddJsonFile($"appsettings.{env.EnvironmentName}.json", optional: true)
                .AddEnvironmentVariables();
            Configuration = builder.Build();
        }

        public IConfigurationRoot Configuration { get; }
		
        public void ConfigureServices(IServiceCollection services)
        {
			services.AddSingleton<IHttpContextAccessor, HttpContextAccessor>();
			services.AddMvc();
			ServiceConfiguration.ConfigureServices(services, this.Configuration);
		}


		public void Configure(IApplicationBuilder app, IHostingEnvironment env, ILoggerFactory loggerFactory, IAntiforgery antiforgery)
		{
			loggerFactory.AddConsole(Configuration.GetSection("Logging"));
			loggerFactory.AddDebug();

			loggerFactory.AddNLog();
			app.AddNLogWeb();
			env.ConfigureNLog("NLog.config");
			
			app.UseMiddleware<ExceptionHandlingMiddleware>();

			app.UseDefaultFiles();
			app.UseStaticFiles();

			app.UseMvc(routes =>
			{
				routes.MapRoute(
					name: "default",
					template: "{controller=Home}/{action=Index}/{id?}");
			});
		}
	}
}
