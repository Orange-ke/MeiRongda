using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;

namespace WebService.Tool
{
    public static class Log
    {
      
        public static void WriteLog(string label, string content)
        {
            string logpath = "D:/log/" + DateTime.Now.ToString("yyyyMMdd_hh") + ".txt";

            if (!Directory.Exists("D:/log/"))
            {
                Directory.CreateDirectory("D:/log/");
            }
            System.IO.File.AppendAllText(logpath, GetContent(label, content));


        }
        /// <summary>
        /// 获取生成日志内容
        /// </summary>
        /// <returns>日志内容</returns>
        public static  string GetContent(string _label, string _content)
        {
            string content = string.Empty;
            content += "\r\n";
            content += "--------------------------记录开始-----------------------------\r\n";
            content += "操作时间：" + DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss.fff") + "\r\n";
            content += "标签：" + _label + "\r\n";
            if (!string.IsNullOrWhiteSpace(_content))
            {
                content += "内容：" + _content + "\r\n";
            }
            content += "--------------------------记录结束-----------------------------\r\n";
            return content;
        }

    }
}