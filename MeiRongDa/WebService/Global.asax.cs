using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Threading;
using System.Web;
using System.Web.Security;
using System.Web.SessionState;
using WebService.Models;
using WebService.Process;
using WebService.Tool;

namespace WebService
{
    public class Global : System.Web.HttpApplication
    {
        public static Plans planSets;
        /// <summary>
        /// 在应用程序启动时运行的代码
        /// </summary>
        /// <param name="sender"></param>
        /// <param name="e"></param>
        protected void Application_Start(object sender, EventArgs e)
        {
            Log.WriteLog("服务状态", "开启！");
            planSets = (Plans)IOHelper.DeserializeFromXML(typeof(Plans), IOHelper.GetMapPath("/plan.config"));
            // 在应用程序启动时运行的代码
            System.Timers.Timer timer = new System.Timers.Timer(1000);
            timer.Elapsed += new System.Timers.ElapsedEventHandler(OnTimedEvent);
            timer.Enabled = true;
        }
        /// <summary>
        /// 在新会话启动时运行的代码
        /// </summary>
        /// <param name="sender"></param>
        /// <param name="e"></param>
        protected void Session_Start(object sender, EventArgs e)
        {

        }

        protected void Application_BeginRequest(object sender, EventArgs e)
        {

        }

        protected void Application_AuthenticateRequest(object sender, EventArgs e)
        {

        }
        /// <summary>
        /// 在出现未处理的错误时运行的代码
        /// </summary>
        /// <param name="sender"></param>
        /// <param name="e"></param>
        protected void Application_Error(object sender, EventArgs e)
        {
            Log.WriteLog("服务状态", "错误！");
        }
        /// <summary>
        ///  在会话结束时运行的代码。
        /// 注意: 只有在 Web.config 文件中的 sessionstate 模式设置为
        /// InProc 时，才会引发 Session_End 事件。如果会话模式设置为 StateServer
        /// 或 SQLServer，则不会引发该事件。
        /// </summary>
        /// <param name="sender"></param>
        /// <param name="e"></param>
        protected void Session_End(object sender, EventArgs e)
        {

        }
        /// <summary>
        /// 在应用程序关闭时运行的代码
        /// </summary>
        /// <param name="sender"></param>
        /// <param name="e"></param>
        protected void Application_End(object sender, EventArgs e)
        {
            Log.WriteLog("服务状态", "结束！");
            Thread.Sleep(1000);
            //这里设置你的web地址，可以随便指向你的任意一个aspx页面甚至不存在的页面，目的是要激发Application_Start  
            if (string.IsNullOrWhiteSpace(planSets.WebUrl))
            {
                HttpWebRequest request = (HttpWebRequest)WebRequest.Create(planSets.WebUrl);
                HttpWebResponse response = (HttpWebResponse)request.GetResponse();
                Stream receiveStream = response.GetResponseStream();//得到回写的字节流
            }
        }
        private static void OnTimedEvent(object source, System.Timers.ElapsedEventArgs e)
        {
            try
            {
                planSets.List.ForEach(x =>
                {
                    if (x.Enabled)
                    {
                        switch (x.Interval)
                        {
                            case 2:
                                DateTime now = DateTime.Now;
                                DateTime time = DateTime.Parse(now.ToString("yyyy-MM-dd ") + x.Time);
                                if (x.LastRunTime == null)
                                    x.LastRunTime = time;
                                if (time <= now && x.LastRunTime.Day != time.Day)
                                {
                                    x.LastRunTime = now;
                                    Log.WriteLog("定时器运行开始", now.ToString("yyyy-MM-dd HH:mm:ss"));
                                    Thread parameterThread = new Thread(new ParameterizedThreadStart(ExecProcedure));
                                    parameterThread.Start(x);
                                }
                                break;
                        }

                    }
                });

            }
            catch (Exception ex)
            {
                Log.WriteLog("定时器运行错误", ex.Message);
            }

        }
        public static void ExecProcedure(object obj)
        {
            Plan plan = obj as Plan;
            if (string.IsNullOrWhiteSpace(plan.ConnectionString))
                Log.WriteLog("定时器运行结果", new Process_BaseInfo().ExecProcedure(plan.ProcedureName, ""));
            else
                Log.WriteLog("定时器运行结果", new Process_BaseInfo().ExecProcedure(plan.ProcedureName, "", plan.ConnectionString));
            Log.WriteLog("定时器运行结束", DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss"));
        }
    }
}