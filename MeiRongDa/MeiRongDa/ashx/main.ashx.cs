using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;

namespace MeiRongDa
{
    /// <summary>
    /// main 的摘要说明
    /// </summary>
    public class main : IHttpHandler
    {

        public void ProcessRequest(HttpContext context)
        {
            string write = "";
            context.Response.ContentType = "text/plain";
            string method = context.Request.Form["method"];
            switch (method)
            {
                case "getTheme":
                    write = JsonConvert.SerializeObject(GetTheme());
                    break;
                default:
                    write = JsonConvert.SerializeObject(new ResultInfo(false, "方法不存在！"));
                    break;

            }
            context.Response.Write(write);


        }
        /// <summary>
        /// 获取主题列表
        /// </summary>
        /// <returns></returns>
        public ResultInfo GetTheme()
        {
            try
            {
                string dsPath = HttpContext.Current.Server.MapPath("../bootstrap/theme");
                string[] dsNames = Directory.GetDirectories(dsPath);
                string[] names = new string[dsNames.Length];
               for(int i=0;i<dsNames.Length;i++){
                   string path=dsNames[i];
                   names[i] = path.Substring(path.LastIndexOf(@"\")+1, path.Length - path.LastIndexOf(@"\")-1);
               }
               return new ResultInfo(true, names);
            }
            catch (Exception ex)
            {
                return new ResultInfo(false, ex.Message);
            }
        }
        public bool IsReusable
        {
            get
            {
                return false;
            }
        }
    }
}