using MySql.Data.MySqlClient;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Runtime.Serialization;
using System.ServiceModel;
using System.ServiceModel.Activation;
using System.ServiceModel.Web;
using System.Text;

namespace dataBaseService
{
    [ServiceContract(Namespace = "")]
    [AspNetCompatibilityRequirements(RequirementsMode = AspNetCompatibilityRequirementsMode.Allowed)]
    [JavascriptCallbackBehavior(UrlParameterName = "jsoncallback")]
    public class Service3
    {
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
        [OperationContract]
        [WebInvoke(Method = "GET", BodyStyle = WebMessageBodyStyle.WrappedRequest,
            ResponseFormat = WebMessageFormat.Json, RequestFormat = WebMessageFormat.Json)]
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
        [OperationContract]
        [WebInvoke(Method = "GET", BodyStyle = WebMessageBodyStyle.WrappedRequest,
            ResponseFormat = WebMessageFormat.Json, RequestFormat = WebMessageFormat.Json)]
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
        [OperationContract]
        [WebInvoke(Method = "GET", BodyStyle = WebMessageBodyStyle.WrappedRequest,
            ResponseFormat = WebMessageFormat.Json, RequestFormat = WebMessageFormat.Json)]
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
        [OperationContract]
        [WebInvoke(Method = "GET", BodyStyle = WebMessageBodyStyle.WrappedRequest,
            ResponseFormat = WebMessageFormat.Json, RequestFormat = WebMessageFormat.Json)]
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
                return "ERR the sql parse is null";
            }
        }
        [OperationContract]
        [WebInvoke(Method = "GET", BodyStyle = WebMessageBodyStyle.WrappedRequest,
            ResponseFormat = WebMessageFormat.Json, RequestFormat = WebMessageFormat.Json)]

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
                    if (id == 0)
                    {
                        reader.Close();
                        return "Root";
                    }
                    else
                    {
                        reader.Close();
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
    }
}
