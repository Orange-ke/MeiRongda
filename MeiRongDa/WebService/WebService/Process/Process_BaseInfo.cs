
using DBUtility;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Common;
using System.Data.SqlClient;
using System.IO;
using System.Linq;
using System.Net;
using System.Text;
using System.Web;
using System.Xml.Serialization;
using Tool;
using WebService.Models;
using WebService.Tool;

namespace WebService.Process
{
    public class Process_BaseInfo
    {
        /// <summary>
        /// 执行存储过程
        /// </summary>
        /// <param name="procedureName"></param>
        /// <param name="parameter"></param>
        /// <returns></returns>
        public string ExecProcedure(string procedureName, string parameter)
        {
            try
            {
                DataSet ds = DbHelperSQL.RunProcedure(procedureName, parameter);
                return JsonConvert.SerializeObject(ds);
            }
            catch (Exception ex) {
                return Results.ToJSON(new Results(false, ex.Message));
            }
            
        }
         /// <summary>
        /// 执行存储过程
        /// </summary>
        /// <param name="procedureName"></param>
        /// <param name="parameter"></param>
        /// <returns></returns>
        public string ExecProcedure(string procedureName, string parameter, string connectionString)
        {
            try
            {
                DataSet ds = new DbHelperSQLP(connectionString).RunProcedure(procedureName, parameter);
                return JsonConvert.SerializeObject(ds);
            }
            catch (Exception ex)
            {
                return Results.ToJSON(new Results(false, ex.Message));
            }
          
        }
       
        /// <summary>
        /// 执行存储过程，返回SqlDataReader ( 注意：调用该方法后，一定要对SqlDataReader进行Close )
        /// </summary>
        /// <param name="storedProcName">存储过程名</param>
        /// <param name="parameters">存储过程参数</param>
        /// <returns>SqlDataReader</returns>
        public  string ExecProcedureXml(string procedureName,string xml)
        {

            xml = LZString.decompressFromEncodedURIComponent(xml);
            xml = HttpUtility.UrlDecode(xml);
    
            DbParameter[] parameters = new DbParameter[]
            {
                DbHelperSQL.CreateXmlParam("@xml",xml)
            };

            try
            {
                DataSet ds = DbHelperSQL.RunProcedureXML(procedureName, parameters);
                return JsonConvert.SerializeObject(ds);
            }
            catch (Exception ex)
            {
                return Results.ToJSON(new Results(false, ex.Message));
            }
     

        }
        /// <summary>
        /// 执行存储过程，返回SqlDataReader ( 注意：调用该方法后，一定要对SqlDataReader进行Close )
        /// </summary>
        /// <param name="storedProcName">存储过程名</param>
        /// <param name="parameters">存储过程参数</param>
        /// <returns>SqlDataReader</returns>
        public string ExecProcedureZip(string procedureName, string zipData)
        {

            try
            {

                List<List<string>> listData = JsonConvert.DeserializeObject<List<List<string>>>(LZString.decompressFromEncodedURIComponent(zipData));
                string xml = "<Xml>";
                for (int i = 1; i < listData.Count; i++)
                {
                    List<string> keys = listData[0];
                    List<string> vals = listData[i];
                    xml += "<Row";
                    for (int j = 0; j < keys.Count; j++)
                    {
                        xml +=" "+ keys[j] + "=\"" + vals[j] + "\"";

                    }
                    xml += " ></Row>";
                }
                xml += "</Xml>";
                DbParameter[] parameters = new DbParameter[]
            {
                DbHelperSQL.CreateXmlParam("@xml",xml)
            };
                try
                {
                    DataSet ds = DbHelperSQL.RunProcedureXML(procedureName, parameters);
                    return JsonConvert.SerializeObject(ds);
                }
                catch (Exception ex)
                {
                    return Results.ToJSON(new Results(false, ex.Message));
                }
     
               
            }
            catch (Exception ex) {
                return Results.ToJSON(new Results(false, ex.Message));
            }
        }
       
      
    
        public string Upload() {

            try
            {
                if (HttpContext.Current.Request.Files.Count > 0)
                {
                    UpLoadFile file = new UpLoadFile(HttpContext.Current.Request.Files[0], HttpContext.Current.Request.Form);
                    return JsonConvert.SerializeObject(new ResultInfo(file.Save(), file.SavePath + "\\" + file.SaveName));
                }
                return Results.ToJSON(new Results(false, ""));
            }
            catch (Exception ex)
            {
                return Results.ToJSON(new Results(false, ex.Message));
            }
           
        }
      
    }
}