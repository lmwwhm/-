using MySql.Data.MySqlClient;
using Org.BouncyCastle.Asn1.Ocsp;
using System;
using System.Data;
using System.Drawing.Drawing2D;
using System.Security.Cryptography;
using System.Security.Policy;
using System.ServiceModel.Activation;
using System.ServiceModel.Web;
using System.Text;
using WeChatMVC.Common;

namespace dataBaseService
{
    [AspNetCompatibilityRequirements(RequirementsMode = AspNetCompatibilityRequirementsMode.Allowed)]
    [JavascriptCallbackBehavior(UrlParameterName = "jsoncallback")]
    // 注意: 使用“重构”菜单上的“重命名”命令，可以同时更改代码、svc 和配置文件中的类名“Service1”。
    // 注意: 为了启动 WCF 测试客户端以测试此服务，请在解决方案资源管理器中选择 Service1.svc 或 Service1.svc.cs，然后开始调试。
    public class Service2 : Service1
    {
        private static string Decrypt(string toDecrypt)
        {
            byte[] keyArray = get_key(); //需要MD5转换
            byte[] toEncryptArray = HexToByte(toDecrypt); //需要将16位形式的字符串转成字节数组
            RijndaelManaged rDel = new RijndaelManaged();
            rDel.Key = keyArray;
            //rDel.KeySize = 128;  //rDel.KeySize已经是128，但是加上这句话后，就不会正确解密
            //rDel.BlockSize = 128;//rDel.BlockSize已经是128，但是加上这句话后，就不会正确解密
            rDel.Mode = CipherMode.ECB;
            rDel.Padding = PaddingMode.PKCS7;

            ICryptoTransform cTransform = rDel.CreateDecryptor();
            byte[] resultArray = cTransform.TransformFinalBlock(toEncryptArray, 0, toEncryptArray.Length);
            return UTF8Encoding.UTF8.GetString(resultArray);
        }

        private static byte[] get_key()//MD5
        {
            string key = "password";//密钥
            byte[] result = Encoding.UTF8.GetBytes(key);
            MD5 md5 = new MD5CryptoServiceProvider();
            return md5.ComputeHash(result);
        }

        private static byte[] HexToByte(string msg)
        {
            //msg = msg.Replace(" ", "");//移除空格
            byte[] comBuffer = new byte[msg.Length / 2];
            for (int i = 0; i < msg.Length; i += 2)
            {
                comBuffer[i / 2] = (byte)Convert.ToByte(msg.Substring(i, 2), 16);
            }
            return comBuffer;
        }
        // 格式转换：DataTable->JSON
        public string DataTableToJSON(DataTable dt)
        {
            StringBuilder jsonBuilder = new StringBuilder();
            jsonBuilder.Append("{\"Name\":\"" + dt.TableName + "\",\"Rows");
            jsonBuilder.Append("\":[");
            for (int i = 0; i < dt.Rows.Count; i++)
            {
                jsonBuilder.Append("{");
                for (int j = 0; j < dt.Columns.Count; j++)
                {
                    jsonBuilder.Append("\"");
                    jsonBuilder.Append(dt.Columns[j].ColumnName);
                    jsonBuilder.Append("\":\"");
                    jsonBuilder.Append(dt.Rows[i][j].ToString().Replace("\"", "\\\""));
                    jsonBuilder.Append("\",");
                }
                jsonBuilder.Remove(jsonBuilder.Length - 1, 1);
                jsonBuilder.Append("},");
            }
            jsonBuilder.Remove(jsonBuilder.Length - 1, 1);
            jsonBuilder.Append("]");
            jsonBuilder.Append("}");
            return jsonBuilder.ToString();
        }
        // 格式转换：DataSet->json
        public string DataSetToJSON(DataSet ds)
        {
            StringBuilder json = new StringBuilder();
            json.Append("{\"Tables\":");
            json.Append("[");
            foreach (System.Data.DataTable dt in ds.Tables)
            {
                json.Append(DataTableToJSON(dt));
                json.Append(",");
            }
            json.Remove(json.Length - 1, 1);
            json.Append("]");
            json.Append("}");
            return json.ToString();
        }
        const string sqlconfig = "Server=localhost;Port=3306;Uid=root;Pwd=123456;Database=lmw";
        MySqlConnection connection = new MySqlConnection(sqlconfig);
        public string INSERT(string sql_text)
        {
            connection.Open();
            var temp_sql = sql_text;
            var list_temp = temp_sql.Split('|');
            string sql = "";
            if (list_temp[3] == "A")
            {
                sql = "INSERT INTO " + list_temp[0] + " " + list_temp[1] + " VALUES " + list_temp[2] + ";";
            }
            else if (list_temp[3] == "B")
            {
                sql = "INSERT INTO " + list_temp[0] + " " + list_temp[1] + " " + list_temp[2] + ";";
            }
            if (sql != "")
            {
                MySqlCommand cmd = new MySqlCommand(sql, connection);
                int result = cmd.ExecuteNonQuery();
                connection.Close();
                if (result == 1)
                {
                    return "True";
                }
                else
                {
                    return "change row:" + result;
                }
            }
            else
            {
                return "ERR the sql parse is null";
            }

        }
        public string DELETE(string sql_text)
        {
            connection.Open();
            var temp_sql = sql_text;
            var list_temp = temp_sql.Split('|');
            string sql = "";
            sql = "DELETE FROM " + list_temp[0] + " WHERE " + list_temp[1] + ";";
            if (sql != "")
            {
                MySqlCommand cmd = new MySqlCommand(sql, connection);
                int result = cmd.ExecuteNonQuery();
                connection.Close();
                if (result == 1)
                {
                    return "True";
                }
                else
                {
                    return "change row:" + result;
                }
            }
            else
            {
                return "ERR the sql parse is null";
            }

        }

        public string UPDATE(string sql_text)
        {
            connection.Open();
            var temp_sql = sql_text;
            var list_temp = temp_sql.Split('|');
            string sql = "";
            sql = "UPDATE " + list_temp[0] + " SET " + list_temp[1] + " WHERE " + list_temp[2] + ";";
            if (sql != "")
            {
                MySqlCommand cmd = new MySqlCommand(sql, connection);
                int result = cmd.ExecuteNonQuery();
                connection.Close();
                if (result == 1)
                {
                    return "True";
                }
                else
                {
                    return "change row:" + result;
                }
            }
            else
            {
                return "ERR the sql parse is null";
            }

        }
        public string Serearch(string sql_text)
        {
            connection.Open();
            var temp_sql = sql_text;
            var list_temp = temp_sql.Split('|');
            string sql = "";
            if (list_temp[6] == "A")
            {
                sql = "SELECT " + list_temp[0] + " FROM " + list_temp[1] + ";";
            }
            else if (list_temp[6] == "B")
            {
                sql = "SELECT " + list_temp[0] + " FROM " + list_temp[1] + " WHERE " + list_temp[2] + ";";
            }
            else if (list_temp[6] == "C")
            {
                sql = "SELECT " + list_temp[0] + " FROM " + list_temp[1] + " ORDER BY " + list_temp[2] + ";";
            }
            else if (list_temp[6] == "D")
            {
                sql = "SELECT " + list_temp[0] + " FROM " + list_temp[1] + " WHERE " + list_temp[2] + "GROUP BY" + list_temp[3] + "HAVING" + list_temp[4] + "ORDER BY" + list_temp[5] + ";";
            }
            else
            {
                sql = "";
            }
            if (sql != "")
            {
                MySqlDataAdapter adapter = new MySqlDataAdapter(sql, connection);
                DataSet ds = new DataSet();
                adapter.Fill(ds);
                connection.Close();
                return DataSetToJSON(ds);
            }
            else
            {
                return "ERR the Sear parse is null";
            }
        }

        public string LOGIN(string username, string password)
        {
            connection.Open();
            var sql = "SELECT * FROM `基本信息` WHERE `基本信息`.username= " + username + "and `基本信息`.password=" + password;
            MySqlCommand cmd = new MySqlCommand(sql, connection);
            MySqlDataReader reader = cmd.ExecuteReader();

            if (reader.HasRows)//判断是否有数据
            {
                int indexId = reader.GetOrdinal("id");  //通过列名获取列号
                if (reader.Read())
                {
                    //建议通过list集合来自定义一个类型，用来存储获取到的数据

                    //int id = (int)dr["id"];此方法会频繁拆箱装箱消耗性能，建议使用下面的方法
                    int id = reader.GetInt32(indexId);  //通过列号获取数据
                    reader.Close();
                    if (id >= 0)
                    {
                        sql = "UPDATE `基本信息` SET is_login=0 WHERE `基本信息`.id>=0";
                        cmd = new MySqlCommand(sql, connection);
                        int result = cmd.ExecuteNonQuery();
                        sql = "UPDATE `基本信息` SET is_login=1 WHERE `基本信息`.id= " + id;
                        cmd = new MySqlCommand(sql, connection);
                        result = cmd.ExecuteNonQuery();
                        
                        return "Root";
                    }
                    else
                    {
                        return "True";
                    }
                }
                return "False";

            }
            else
            {
                reader.Close();
                return "False";
            }
        }

        public string LOGIN2(string username, string password)
        {
            connection.Open();
            var sql = "SELECT * FROM `用户` WHERE `用户`.username= " + username + "and `用户`.password=" + password;
            MySqlCommand cmd = new MySqlCommand(sql, connection);
            MySqlDataReader reader = cmd.ExecuteReader();

            if (reader.HasRows)//判断是否有数据
            {
                int indexId = reader.GetOrdinal("id");  //通过列名获取列号
                if (reader.Read())
                {
                    //建议通过list集合来自定义一个类型，用来存储获取到的数据

                    //int id = (int)dr["id"];此方法会频繁拆箱装箱消耗性能，建议使用下面的方法
                    int id = reader.GetInt32(indexId);  //通过列号获取数据
                    reader.Close();
                    if (id >= 0)
                    {
                        sql = "UPDATE `用户` SET is_login=0 WHERE `用户`.id>=0";
                        cmd = new MySqlCommand(sql, connection);
                        int result = cmd.ExecuteNonQuery();
                        sql = "UPDATE `用户` SET is_login=1 WHERE `用户`.id= " + id;
                        cmd = new MySqlCommand(sql, connection);
                        result = cmd.ExecuteNonQuery();
                        return "True";
                    }
                    else
                    {
                        return "True";
                    }
                }
                return "False";

            }
            else
            {
                reader.Close();
                return "False";
            }
        }

        public string IN(string txt)
        {
            //WeChatMVC.Common.JsEncryptHelper jsHelper = new JsEncryptHelper();
            //txt = jsHelper.Decrypt(txt);
            //return txt;
            txt = Decrypt(txt);  
            var temp_sql = txt;
            var list_temp = temp_sql.Split('|');
            if (list_temp[0] == "admin1")
            {
                var sqltxt = list_temp[1] + "|(name,age,username,password,phone," + list_temp[2] + "," + list_temp[3] + ")|(" + list_temp[4] + list_temp[5] + list_temp[6] + list_temp[7] + list_temp[8] + "'6','0')|A";
                return INSERT(sqltxt);
            }
            if (list_temp[0] == "admin2")
            {
                var sqltxt = list_temp[1] + "|id='" + list_temp[2] + "'";
                return DELETE(sqltxt);
            }
            if (list_temp[0] == "admin3")
            {
                var sqltxt = list_temp[1] + "|name=" + list_temp[2] + "age=" + list_temp[3] + "username=" + list_temp[4] + "phone=" + list_temp[5] + "|id=" + list_temp[6];
                return UPDATE(sqltxt);
            }
            if (list_temp[0] == "admin40")
            {
                var sqltxt = "id, name, age, username, phone | " + list_temp[1] + " | id >= 0 ||||B";
                return Serearch(sqltxt);
            }
            if (list_temp[0] == "admin41")
            {
                var sqltxt = "id,name,age,username,phone|" + list_temp[1] + "|username =" + list_temp[2] + "||||B";
                return Serearch(sqltxt);
            }
            if (list_temp[0] == "analy1")
            {
                var sqltxt = "income,outcome,time," + list_temp[1] + "|" + list_temp[2] + "|||||A";
                return Serearch(sqltxt);
            }
            if (list_temp[0] == "analy2")
            {
                var sqltxt = "date|" + list_temp[1] + "|||||A";
                return Serearch(sqltxt);
            }
            if (list_temp[0] == "analy3")
            {
                var sqltxt = "time|" + list_temp[1] + "|||||A";
                return Serearch(sqltxt);
            }
            if (list_temp[0] == "analy4")
            {
                var sqltxt = list_temp[1] + "|" + list_temp[2] + "|||||A";
                return Serearch(sqltxt);
            }
            if (list_temp[0] == "analy5")
            {
                var sqltxt = "date,deadline," + list_temp[1] + "|" + list_temp[2] + "|||||A";
                return Serearch(sqltxt);
            }
            if (list_temp[0] == "bas12")
            {
                var sqltxt = list_temp[1] + "|name=" + list_temp[2] + ",age=" + list_temp[3] + ",username=" + list_temp[4] + ",password=" + list_temp[5] + ",phone=" + list_temp[6] + "," + list_temp[7] + "=" + list_temp[8] + "," + list_temp[9] + "=" + list_temp[10] + "|is_login=1";
                return UPDATE(sqltxt);
            }
            if (list_temp[0] == "bas11")
            {
                var sqltxt = list_temp[1] + "|name=" + list_temp[2] + ",age=" + list_temp[3] + ",username=" + list_temp[4] + ",password=" + list_temp[5] + ",phone=" + list_temp[6] + "," + list_temp[7] + "=" + list_temp[8] + "|id=0";
                return UPDATE(sqltxt);
            }
            if (list_temp[0] == "bas22")
            {
                var sqltxt = "name,age,username,password,phone," + list_temp[1] + list_temp[2] + list_temp[3] + "|" + list_temp[4] + "|is_login='" + 1 + "'||||B";
                return Serearch(sqltxt);
            }
            if (list_temp[0] == "bas21")
            {
                var sqltxt = "name,age,username,password,phone," + list_temp[1] + "|" + list_temp[2] + "|id='" + 0 + "'||||B";
                return Serearch(sqltxt);
            }
            if (list_temp[0] == "bo1")
            {
                var sqltxt = list_temp[1] + "|(name,plan," + list_temp[2] + ")|(" + list_temp[3] + list_temp[4] + "'0')|A";
                return INSERT(sqltxt);
            }
            if (list_temp[0] == "bo2")
            {
                var sqltxt = list_temp[1] + "|id='" + list_temp[2] + "'";
                return DELETE(sqltxt);
            }
            if (list_temp[0] == "bo3")
            {
                var sqltxt = list_temp[1] + "|" + list_temp[2] + "=1|id=" + list_temp[3];
                return UPDATE(sqltxt);
            }
            if (list_temp[0] == "bo4")
            {
                var sqltxt = list_temp[1] + "|name=" + list_temp[2] + "plan=" + list_temp[3] + list_temp[4] + "=" + list_temp[5] + "|id=" + list_temp[6];
                return UPDATE(sqltxt);
            }
            if (list_temp[0] == "bo51")
            {
                var sqltxt = "id,name,plan," + list_temp[1] + "|" + list_temp[2] + "|id >= 0||||B";
                return Serearch(sqltxt);
            }
            if (list_temp[0] == "bo52")
            {
                var sqltxt = "id,name,plan," + list_temp[1] + "|" + list_temp[2] + "|name =" + list_temp[3] + "||||B";
                return Serearch(sqltxt);
            }

            if (list_temp[0] == "cal1")
            {
                var sqltxt = list_temp[1] + "|(date,todo,deadline," + list_temp[2] + ")|(" + list_temp[3] + list_temp[4] + list_temp[5] + "'0')|A";
                return INSERT(sqltxt);
            }
            if (list_temp[0] == "cal2")
            {
                var sqltxt = list_temp[1] + "|id='" + list_temp[2] + "'";
                return DELETE(sqltxt);
            }
            if (list_temp[0] == "cal3")
            {
                var sqltxt = list_temp[1] + "|" + list_temp[2] + "=1|id=" + list_temp[3];
                return UPDATE(sqltxt);
            }
            if (list_temp[0] == "cal4")
            {
                var sqltxt = list_temp[1] + "|date=" + list_temp[2] + "todo=" + list_temp[3] + "deadline=" + list_temp[4] + list_temp[5] + "=" + list_temp[6] + "|id=" + list_temp[7];
                return UPDATE(sqltxt);
            }
            if (list_temp[0] == "cal5")
            {
                var sqltxt = "id,date,todo,deadline," + list_temp[1] + "|" + list_temp[2] + "|date >=" + list_temp[3] + "and deadline<=" + list_temp[4] + "||||B";
                return Serearch(sqltxt);
            }

            if (list_temp[0] == "dat1")
            {
                var sqltxt = list_temp[1] + "|(" + list_temp[2] + list_temp[3] + list_temp[3] + ")|(" + list_temp[5] + list_temp[6] + list_temp[7] + ")|A";
                return INSERT(sqltxt);
            }
            if (list_temp[0] == "dat2")
            {
                var sqltxt = list_temp[1] + "|id='" + list_temp[2] + "'";
                return DELETE(sqltxt);
            }
            if (list_temp[0] == "dat3")
            {
                var sqltxt = list_temp[1] + "|" + list_temp[2] + list_temp[3] + list_temp[4] + list_temp[5] + "|id=" + list_temp[6];
                return UPDATE(sqltxt);
            }
            if (list_temp[0] == "dat4")
            {
                var sqltxt = list_temp[1] + "|" + list_temp[2] + list_temp[3] + list_temp[4] + list_temp[5] + list_temp[6] + list_temp[7] + "|id=" + list_temp[8];
                return UPDATE(sqltxt);
            }
            if (list_temp[0] == "dat5")
            {
                var sqltxt = "id," + list_temp[1] + list_temp[2] + list_temp[3] + "|" + list_temp[4] + "|id >= 0 and " + list_temp[5] + "<=" + list_temp[6] + "||||B";
                return Serearch(sqltxt);
            }
            if (list_temp[0] == "dat6")
            {
                var sqltxt = "id," + list_temp[1] + list_temp[2] + list_temp[3] + "|" + list_temp[4] + "|'文件名' =" + list_temp[5] + " and" + list_temp[6] + " <=" + list_temp[7] + "||||B";
                return Serearch(sqltxt);
            }
            if (list_temp[0] == "dat7")
            {
                var sqltxt = "id," + list_temp[1] + list_temp[2] + list_temp[3] + "|" + list_temp[4] + "|id >= 0||||B";
                return Serearch(sqltxt);
            }
            if (list_temp[0] == "dat8")
            {
                var sqltxt = "id," + list_temp[1] + list_temp[2] + list_temp[3] + "|" + list_temp[4] + "|'文件名' =" + list_temp[5] + "||||B";
                return Serearch(sqltxt);
            }

            if (list_temp[0] == "dir1")
            {
                var sqltxt = list_temp[1] + "|(date,dowhat)|(" + list_temp[2] + list_temp[3] + ")|A";
                return INSERT(sqltxt);
            }
            if (list_temp[0] == "dir2")
            {
                var sqltxt = list_temp[1] + "|id='" + list_temp[2] + "'";
                return DELETE(sqltxt);
            }
            if (list_temp[0] == "dir3")
            {
                var sqltxt = list_temp[1] + "|date=" + list_temp[2] + "dowhat=" + list_temp[3] + "|id=" + list_temp[4];
                return UPDATE(sqltxt);
            }
            if (list_temp[0] == "dir4")
            {
                var sqltxt = "id,date,dowhat|" + list_temp[1] + "|date >=" + list_temp[2] + " and date<=" + list_temp[3] + "||||B";
                return Serearch(sqltxt);
            }
            if (list_temp[0] == "upl")
            {
                var sqltxt = list_temp[1] + "|(name,age,username,password,phone," + list_temp[2] + "," + list_temp[3] + "," + list_temp[4] + "," + list_temp[5] + ")|(" + list_temp[6] + list_temp[7] + list_temp[8] + list_temp[9] + list_temp[10] + list_temp[11] + "'0','0','0')|A";
                return INSERT(sqltxt);
            }
            if (list_temp[0] == "meb1")
            {
                var sqltxt = list_temp[1] + "|(name,phone)|(" + list_temp[2] + list_temp[3] + ")|A";
                return INSERT(sqltxt);
            }
            if (list_temp[0] == "meb2")
            {
                var sqltxt = list_temp[1] + "|id='" + list_temp[2] + "'";
                return DELETE(sqltxt);
            }
            if (list_temp[0] == "meb3")
            {
                var sqltxt = list_temp[1] + "|name=" + list_temp[2] + "phone=" + list_temp[3] + "|id=" + list_temp[4];
                return UPDATE(sqltxt);
            }
            if (list_temp[0] == "meb4")
            {
                var sqltxt = "id,name,phone|" + list_temp[1] + "|id >= 0||||B";
                return Serearch(sqltxt);
            }
            if (list_temp[0] == "meb5")
            {
                var sqltxt = "id,name,phone|" + list_temp[1] + "|name =" + list_temp[2] + "||||B";
                return Serearch(sqltxt);
            }

            if (list_temp[0] == "pe1")
            {
                var sqltxt = list_temp[1] + "|(name,age,phone," + list_temp[2] + list_temp[3] + ")|(" + list_temp[4] + list_temp[5] + list_temp[6] + list_temp[7] + list_temp[8] + ")|A";
                return INSERT(sqltxt);
            }
            if (list_temp[0] == "pe2")
            {
                var sqltxt = list_temp[1] + "|id='" + list_temp[2] + "'";
                return DELETE(sqltxt);
            }
            if (list_temp[0] == "pe3")
            {
                var sqltxt = list_temp[1] + "|name=" + list_temp[2] + "age=" + list_temp[3] + "phone=" + list_temp[4] + list_temp[5] + "=" + list_temp[6] + list_temp[7] + "=" + list_temp[8] + "|id=" + list_temp[9];
                return UPDATE(sqltxt);
            }
            if (list_temp[0] == "pe4")
            {
                var sqltxt = "id,name,age,phone," + list_temp[1] + list_temp[2] + "|" + list_temp[3] + "|id >= 0||||B";
                return Serearch(sqltxt);
            }
            if (list_temp[0] == "pe5")
            {
                var sqltxt = "id,name,age,phone," + list_temp[1] + list_temp[2] + "|" + list_temp[3] + "|name =" + list_temp[4] + "||||B";
                return Serearch(sqltxt);
            }

            if (list_temp[0] == "reg")
            {
                var sqltxt = list_temp[1] + "|(name,age,username,password,phone," + list_temp[2] + "," + list_temp[3] + "," + list_temp[4] + "," + list_temp[5] + ")|(" + list_temp[6] + list_temp[7] + list_temp[8] + list_temp[9] + list_temp[10] + list_temp[11] + "'0','0','0')|A";
                return INSERT(sqltxt);
            }

            if (list_temp[0] == "ro1")
            {
                var sqltxt = list_temp[1] + "|(name,age,username,password,phone," + list_temp[2] + "," + list_temp[3] + "," + list_temp[4] + "," + list_temp[5] + ")|(" + list_temp[6] + list_temp[7] + list_temp[8] + list_temp[9] + list_temp[10] + list_temp[11] + "'0','0','0')|A";
                return INSERT(sqltxt);
            }
            if (list_temp[0] == "ro2")
            {
                var sqltxt = list_temp[1] + "|id='" + list_temp[2] + "'";
                return DELETE(sqltxt);
            }
            if (list_temp[0] == "ro3")
            {
                var sqltxt = list_temp[1] + "|name=" + list_temp[2] + "age=" + list_temp[3] + "username=" + list_temp[4] + "phone=" + list_temp[5] + "权限=" + list_temp[5] + "|id=" + list_temp[6];
                return UPDATE(sqltxt);
            }
            if (list_temp[0] == "ro4")
            {
                var sqltxt = "id,name,age,username,phone," + list_temp[1] + "," + list_temp[2] + "," + list_temp[3] + "|" + list_temp[4] + "|id >= 0||||B";
                return Serearch(sqltxt);
            }
            if (list_temp[0] == "ro5")
            {
                var sqltxt = "id,name,age,username,phone," + list_temp[1] + "," + list_temp[2] + "," + list_temp[3] + "|" + list_temp[4] + "|name =" + list_temp[5] + "||||B";
                return Serearch(sqltxt);
            }

            if (list_temp[0] == "ti1")
            {
                var sqltxt = list_temp[1] + "|(timedur,todo)|(" + list_temp[2] + list_temp[3] + ")|A";
                return INSERT(sqltxt);
            }
            if (list_temp[0] == "ti2")
            {
                var sqltxt = list_temp[1] + "|id='" + list_temp[2] + "'";
                return DELETE(sqltxt);
            }
            if (list_temp[0] == "ti3")
            {
                var sqltxt = list_temp[1] + "|timedur=" + list_temp[2] + "todo=" + list_temp[3] + "|id=" + list_temp[4];
                return UPDATE(sqltxt);
            }
            if (list_temp[0] == "ti4")
            {
                var sqltxt = "id,timedur,todo|" + list_temp[1] + "|id >= 0||||B";
                return Serearch(sqltxt);
            }
            if (list_temp[0] == "wea1")
            {
                var sqltxt = list_temp[1] + "|(income,outcome,time,dowhat," + list_temp[2] + ")|(" + list_temp[3] + list_temp[4] + list_temp[5] + list_temp[6] + list_temp[7] + ")|A";
                return INSERT(sqltxt);
            }
            if (list_temp[0] == "wea2")
            {
                var sqltxt = list_temp[1] + "|id='" + list_temp[2] + "'";
                return DELETE(sqltxt);
            }
            if (list_temp[0] == "wea3")
            {
                var sqltxt = list_temp[1] + "|income=" + list_temp[2] + "outcome=" + list_temp[3] + "time=" + list_temp[4] + "dowhat=" + list_temp[5] + list_temp[6] + "=" + list_temp[7] + "|id=" + list_temp[8];
                return UPDATE(sqltxt);
            }
            if (list_temp[0] == "wea4")
            {
                var sqltxt = "id,income,outcome,time,dowhat," + list_temp[1] + "|" + list_temp[2] + "|time >=" + list_temp[3] + " and time<=" + list_temp[4] + "||||B";
                return Serearch(sqltxt);
            }
            if (list_temp[0] == "wel1")
            {
                var sqltxt = list_temp[1] + "|" + list_temp[2] + "|is_login='" + 1 + "'||||B";
                return Serearch(sqltxt);
            }
            if (list_temp[0] == "wel2")
            {
                var sqltxt = "count(*)|" + list_temp[1] + "|||||A";
                return Serearch(sqltxt);
            }

            if (list_temp[0] == "wel3")
            {
                var sqltxt = "username|" + list_temp[1] + "|is_login = 1||||B";
                return Serearch(sqltxt);
            }
            if (list_temp[0] == "wel4")
            {
                var sqltxt = list_temp[1] + "|" + list_temp[2] + " |" + list_temp[3] + "<=" + list_temp[4] + "||||B";
                return Serearch(sqltxt);
            }
            if (list_temp[0] == "wel21")
            {
                var sqltxt = "count(*)|" + list_temp[1] + "|||||A";
                return Serearch(sqltxt);
            }
            if (list_temp[0] == "wel22")
            {
                var sqltxt = "count(*)|" + list_temp[1] + "|||||A";
                return Serearch(sqltxt);
            }
            if (list_temp[0] == "wel23")
            {
                var sqltxt = "date|" + list_temp[1] + "|||||A";
                return Serearch(sqltxt);
            }
            if (list_temp[0] == "wel24")
            {
                var sqltxt = "date|" + list_temp[1] + "|||||A";
                return Serearch(sqltxt);
            }
            if (list_temp[0] == "wel25")
            {
                var sqltxt = "time|" + list_temp[1] + "|||||A";
                return Serearch(sqltxt);
            }

            if (list_temp[0] == "wel26")
            {
                var sqltxt = list_temp[1] + "|" + list_temp[2] + "|||||A";
                return Serearch(sqltxt);
            }

            if (list_temp[0] == "wel27")
            {
                var sqltxt = "date,deadline," + list_temp[1] + "|" + list_temp[2] + "|||||A";
                return Serearch(sqltxt);
            }
            else return "IN ERROR";
        }
    }
}