using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace MeiRongDa
{
    public class ResultInfo
    {
        /// <summary>
        /// 是否执行成功
        /// </summary>
        public bool Result { get; set; }

     

        /// <summary>
        /// 附带信息
        /// </summary>
        public string Info { get; set; }

        /// <summary>
        /// 返回数据
        /// </summary>
        public object Data { get; set; }
        /// <summary>
        /// 返回结果基础模型类 ResultInfo 的一个实例对象
        /// </summary>
        /// <param name="Result">是否执行成功</param>
        /// <param name="Data">返回数据</param>
        public ResultInfo(bool Result, object Data)
        {
            this.Result = Result;
            this.Data = Data;

            this.Info = Result ? "执行成功" : "发生错误";
        }

        /// <summary>
        /// 返回结果基础模型类 ResultInfo 的一个实例对象
        /// </summary>
        /// <param name="Result">是否执行成功</param>
        /// <param name="Info">附带信息</param>
        public ResultInfo(bool Result, string Info)
        {
            this.Result = Result;
            this.Info = Info;
        }

        /// <summary>
        /// 返回结果基础模型类 ResultInfo 的一个实例对象
        /// </summary>
        /// <param name="Success">是否执行成功</param>
       
        /// <param name="Message">附带信息</param>
        /// <param name="Data">返回数据</param>
        public ResultInfo(bool Result, string Info, object Data)
        {
            this.Result = Result;
            this.Data = Data;
         
            this.Info = Info;
        }

    }
}