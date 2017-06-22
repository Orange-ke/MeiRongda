using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebService.Models
{
    public class Plans
    {
        public List<Plan> List { get; set; }
        public string WebUrl { get; set; }
    }
    public class Plan
    {
        public string ProcedureName { get; set; }
        public int Interval { get; set; }
        public bool Enabled { get; set; }
        public string Time { get; set; }
        public string ConnectionString { get; set; }
        public DateTime LastRunTime { get; set; }
    }

}