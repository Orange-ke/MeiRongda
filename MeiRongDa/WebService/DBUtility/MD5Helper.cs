﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Security.Cryptography;

namespace Common
{
    /// <summary>
    /// MD5加密处理
    /// zhufm   2013.01.03
    /// </summary>
    public class MD5Helper
    {
        #region [MD5 16位加密 加密后密码为大写]
        /// <summary>
        /// MD5 16位加密 加密后密码为大写
        /// </summary>
        /// <param name="ConvertString"></param>
        /// <returns></returns>
        public static string MD5_16(string str)
        {
            MD5CryptoServiceProvider md5 = new MD5CryptoServiceProvider();
            string strRes = BitConverter.ToString(md5.ComputeHash(UTF8Encoding.Default.GetBytes(str)), 4, 8);
            strRes = strRes.Replace("-", "");
            return strRes;
        }
        #endregion

        #region [MD5　32位加密]
        /// <summary>
        /// MD5　32位加密
        /// </summary>
        /// <param name="str"></param>
        /// <returns></returns>
        public static string MD5_32(string str)
        {
            //实例化一个md5对像
            MD5 md5Hash = MD5.Create();

            //加密后是一个字节类型的数组，这里要注意编码UTF8/Unicode等的选择　
            byte[] data = md5Hash.ComputeHash(Encoding.UTF8.GetBytes(str));

            StringBuilder sBuilder = new StringBuilder();

            // 通过使用循环，将字节类型的数组转换为字符串，此字符串是常规字符格式化所得
            for (int i = 0; i < data.Length; i++)
            {
                sBuilder.Append(data[i].ToString("x2"));
            }

            //返加密结果，转成大写
            return sBuilder.ToString().ToUpper();
        }
        #endregion

        //public static string GetMd5Hash(string str)
        //{
        //string cl = str;
        //string pwd = "";
        //MD5 md5 = MD5.Create();//实例化一个md5对像
        //// 加密后是一个字节类型的数组，这里要注意编码UTF8/Unicode等的选择　
        //byte[] s = md5.ComputeHash(Encoding.UTF8.GetBytes(cl));
        //// 通过使用循环，将字节类型的数组转换为字符串，此字符串是常规字符格式化所得
        //for (int i = 0; i < s.Length; i++)
        //{
        //    // 将得到的字符串使用十六进制类型格式。格式后的字符是小写的字母，如果使用大写（X）则格式后的字符是大写字符
        //    pwd = pwd + s[i].ToString("X");
        //}
        //return pwd;
        //}


    }
}
