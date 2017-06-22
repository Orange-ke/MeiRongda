using DBUtility;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Web;
using System.Web.Services;
using WebService.Process;

namespace WebService
{
    /// <summary>
    /// Base 的摘要说明
    /// </summary>
    [WebService(Namespace = "http://tempuri.org/")]
    [WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
    [System.ComponentModel.ToolboxItem(false)]
    // 若要允许使用 ASP.NET AJAX 从脚本中调用此 Web 服务，请取消注释以下行。 
    // [System.Web.Script.Services.ScriptService]
    public class AnbotekInfo : System.Web.Services.WebService
    {
        string jsoncallback = HttpContext.Current.Request["jsoncallback"];

        [WebMethod(Description = "查询证书")]
        public string CertificateQuery(string number, string password)
        {
            return new Process_AnbotekInfo().CertificateQuery(number,password);
        }
        [WebMethod(Description = "查询证书")]
        public void WebCertificateQuery(string number, string password)
        {

            string result = new Process_AnbotekInfo().CertificateQuery(number, password);
            HttpContext.Current.Response.Charset = "UTF-8";
            HttpContext.Current.Response.ContentEncoding = System.Text.Encoding.UTF8;
            HttpContext.Current.Response.Write(jsoncallback + "(" + JsonConvert.SerializeObject("(" + result + ")", Formatting.Indented) + ")");
            HttpContext.Current.Response.End();
        }
       
    }
}
