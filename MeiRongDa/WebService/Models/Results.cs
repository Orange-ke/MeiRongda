using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebService.Models
{
   
    public class Results
    {
        public bool Result { get; set; }
        public string Info { get; set; }
        public object Data { get; set; }
        public Results(){}
        public Results(bool result,string info,object data) {
            this.Result = result;
            this.Info = info;
            this.Data = data;
        }
        public Results(bool result, string info)
        {
            this.Result = result;
            this.Info = info;
        }
        public  static  string ToJSON(Results results){
            return "{\"ds\":[" + JsonConvert.SerializeObject(results) + "]}";
        }
    }

}