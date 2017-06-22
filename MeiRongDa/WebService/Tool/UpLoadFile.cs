using System;
using System.Collections.Generic;
using System.Collections.Specialized;
using System.Linq;
using System.Web;

namespace Tool
{
    public class UpLoadFile
    {
         /*文件*/
        private HttpPostedFile file;

        public HttpPostedFile File
        {
            get { return file; }
            set { file = value; }
        }
        /*保存路径*/
        private string savePath;

        public string SavePath
        {
            get { return savePath; }
            set { savePath = value; }
        }
        /*保存名*/
        private string saveName;

        public string SaveName
        {
            get { return saveName; }
            set { saveName = value; }
        }
        /*文件路径*/
        private string filePath;

        public string FilePath
        {
            get { return filePath; }
            set { filePath = value; }
        }
        /*文件名称*/
        private string fileName;

        public string FileName
        {
            get { return fileName; }
            set { fileName = value; }
        }
        /*文件类型*/
        private string fileType;

        public string FileType
        {
            get { return fileType; }
            set { fileType = value; }
        }
        /*读取路径*/
        private string loadPath;

        public string LoadPath
        {
            get { return loadPath; }
            set { loadPath = value; }
        }
        /*上传路径*/
        private string uploadPath;

        public string UploadPath
        {
            get { return uploadPath; }
            set { uploadPath = value; }
        }
        /*参数*/
        private NameValueCollection from;

        public NameValueCollection From
        {
            get { return from; }
            set { from = value; }
        }
        /*名称*/
        private string name;

        public string Name
        {
            get { return name; }
            set { name = value; }
        }
        public UpLoadFile(HttpPostedFile file)
        {
            this.file = file;
            this.fileName = file.FileName;
            this.fileType = fileName.Substring(fileName.LastIndexOf('.'));
        }
        public UpLoadFile(HttpPostedFile file,NameValueCollection from)
        {
            this.file = file;
            this.fileName = file.FileName;
            this.fileType = fileName.Substring(fileName.LastIndexOf('.'));
            this.from = from;
            this.SavePath = from["SavePath"];
            this.SaveName = from["SaveName"];
        }
        public bool Save() {
            try
            {
                this.file.SaveAs(this.SavePath + @"\" + this.SaveName);
                return true;
            }
            catch (Exception ex) {
                return false;
            }
        }
    }
}