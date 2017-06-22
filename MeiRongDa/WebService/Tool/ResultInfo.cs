using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Tool
{
    public class ResultInfo
    {
        /// <summary>
        /// 是否执行成功
        /// </summary>
        public bool Success { get; set; }

        /// <summary>
        /// 标示码（0为成功）
        /// </summary>
        public int Code { get; set; }

        /// <summary>
        /// 附带信息
        /// </summary>
        public string Message { get; set; }

        /// <summary>
        /// 返回数据
        /// </summary>
        public object Data { get; set; }
        /// <summary>
        /// 返回结果基础模型类 ResultInfo 的一个实例对象
        /// </summary>
        /// <param name="Success">是否执行成功</param>
        /// <param name="Data">返回数据</param>
        public ResultInfo(bool Success, object Data)
        {
            this.Success = Success;
            this.Data = Data;
            this.Code = Success ? 0 : -1;
            this.Message = Success ? "成功" : "失败";
        }

        /// <summary>
        /// 返回结果基础模型类 ResultInfo 的一个实例对象
        /// </summary>
        /// <param name="Success">是否执行成功</param>
        /// <param name="Message">附带信息</param>
        public ResultInfo(bool Success, string Message)
        {
            this.Success = Success;
            this.Code = Success ? 0 : -1;
            this.Message = Message;
        }

        /// <summary>
        /// 返回结果基础模型类 ResultInfo 的一个实例对象
        /// </summary>
        /// <param name="Success">是否执行成功</param>
        /// <param name="Code">标示码（0为成功）</param>
        /// <param name="Message">附带信息</param>
        /// <param name="Data">返回数据</param>
        public ResultInfo(bool Success, int Code, string Message, object Data)
        {
            this.Success = Success;
            this.Data = Data;
            this.Code = Code;
            this.Message = Message;
        }

    }
}