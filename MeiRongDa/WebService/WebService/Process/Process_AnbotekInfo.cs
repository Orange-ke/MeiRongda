using DBUtility;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Linq;
using System.Web;
using Tool;

namespace WebService.Process
{
    public class Process_AnbotekInfo
    {
        public string CertificateQuery(string number, string password) {

        DataSet ds=  DbHelperSQL.Query("SELECT *  FROM zhengshu WHERE  REPLACE(CONVERT(varchar(100), riqi, 103),'/','')='" + password + "' AND Name='" + number + "'");
        if (ds.Tables[0].Rows.Count < 1)
            return JsonConvert.SerializeObject(new ResultInfo(false, "失败"));
        else
            return JsonConvert.SerializeObject(new ResultInfo(true, ds.Tables[0]));
        }
    }
}