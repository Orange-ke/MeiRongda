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
    public class BaseInfo : System.Web.Services.WebService
    {
        string jsoncallback = HttpContext.Current.Request["jsoncallback"];

        [WebMethod(Description = "执行函数")]
        public string ExecProcedure(string procedureName, string parameter)
        {
            return new Process_BaseInfo().ExecProcedure(procedureName, parameter);
        }
        [WebMethod(Description = "执行函数")]
        public void WebExecProcedure(string procedureName, string parameter)
        {

            string result = new Process_BaseInfo().ExecProcedure(procedureName, parameter);
            HttpContext.Current.Response.Charset = "UTF-8";
            HttpContext.Current.Response.ContentEncoding = System.Text.Encoding.UTF8;
            HttpContext.Current.Response.Write(jsoncallback + "(" + JsonConvert.SerializeObject("(" + result + ")", Formatting.Indented) + ")");
            HttpContext.Current.Response.End();
        }
        [WebMethod(Description = "执行函数XML")]
        public string ExecProcedureXml(string procedureName, string parameter)
        {
            return new Process_BaseInfo().ExecProcedureXml(procedureName, parameter);
        }
        [WebMethod(Description = "执行函数XML")]
        public void WebExecProcedureXml(string procedureName, string parameter)
        {

            string result = new Process_BaseInfo().ExecProcedureXml(procedureName, parameter);
            HttpContext.Current.Response.Charset = "UTF-8";
            HttpContext.Current.Response.ContentEncoding = System.Text.Encoding.UTF8;
            HttpContext.Current.Response.Write(jsoncallback + "(" + JsonConvert.SerializeObject("(" + result + ")", Formatting.Indented) + ")");
            HttpContext.Current.Response.End();
        }
        [WebMethod(Description = "执行函数Zip")]
        public string ExecProcedureZip(string procedureName, string parameter)
        {
            return new Process_BaseInfo().ExecProcedureZip(procedureName, parameter);
        }
        [WebMethod(Description = "执行函数Zip")]
        public void WebExecProcedureZip(string procedureName, string parameter)
        {

            string result = new Process_BaseInfo().ExecProcedureZip(procedureName, parameter);
            HttpContext.Current.Response.Charset = "UTF-8";
            HttpContext.Current.Response.ContentEncoding = System.Text.Encoding.UTF8;
            HttpContext.Current.Response.Write(jsoncallback + "(" + JsonConvert.SerializeObject("(" + result + ")", Formatting.Indented) + ")");
            HttpContext.Current.Response.End();
        }
        [WebMethod(Description = "上传文件")]
        public string Upload()
        {
            return new Process_BaseInfo().Upload();
        }
        [WebMethod(Description = "上传文件")]
        public void WebUpload()
        {
            string result = new Process_BaseInfo().Upload();
            HttpContext.Current.Response.Charset = "UTF-8";
            HttpContext.Current.Response.ContentEncoding = System.Text.Encoding.UTF8;
            HttpContext.Current.Response.Write(jsoncallback + "(" + JsonConvert.SerializeObject("(" + result + ")", Formatting.Indented) + ")");
            HttpContext.Current.Response.End();
        }
        public static string Decrypt(string encryptedString, string key, string iv)
        {
            encryptedString = encryptedString.Replace("%", "+");
            byte[] buffer = Convert.FromBase64String(encryptedString);
         MemoryStream ms = new MemoryStream();
         DESCryptoServiceProvider tdes = new DESCryptoServiceProvider();
         CryptoStream encStream = new CryptoStream(ms, tdes.CreateDecryptor(Encoding.UTF8.GetBytes(key), Encoding.UTF8.GetBytes(iv)), CryptoStreamMode.Write);
         encStream.Write(buffer, 0, buffer.Length);
         encStream.FlushFinalBlock();
         return Encoding.UTF8.GetString(ms.ToArray());
        }
    }
}
