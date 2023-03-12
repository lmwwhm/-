using System.Data;
using System.ServiceModel;
using System.ServiceModel.Web;

namespace dataBaseService
{
    [ServiceContract(Namespace = "")]
    public interface Service1
    {
        string DataTableToJSON(DataTable dt);
        string DataSetToJSON(DataSet ds);

        [OperationContract]
        [WebInvoke(Method = "GET", BodyStyle = WebMessageBodyStyle.WrappedRequest,
            ResponseFormat = WebMessageFormat.Json, RequestFormat = WebMessageFormat.Json)]
        string IN(string txt);

        [OperationContract]
        [WebInvoke(Method = "GET", BodyStyle = WebMessageBodyStyle.WrappedRequest,
            ResponseFormat = WebMessageFormat.Json, RequestFormat = WebMessageFormat.Json)]
        string INSERT(string sql_text);

        [OperationContract]
        [WebInvoke(Method = "GET", BodyStyle = WebMessageBodyStyle.WrappedRequest,
            ResponseFormat = WebMessageFormat.Json, RequestFormat = WebMessageFormat.Json)]
        string UPDATE(string sql_text);

        [OperationContract]
        [WebInvoke(Method = "GET", BodyStyle = WebMessageBodyStyle.WrappedRequest,
            ResponseFormat = WebMessageFormat.Json, RequestFormat = WebMessageFormat.Json)]
        string Serearch(string sql_text);

        [OperationContract]
        [WebInvoke(Method = "GET", BodyStyle = WebMessageBodyStyle.WrappedRequest,
            ResponseFormat = WebMessageFormat.Json, RequestFormat = WebMessageFormat.Json)]
        string DELETE(string sql_text);

        [OperationContract]
        [WebInvoke(Method = "GET", BodyStyle = WebMessageBodyStyle.WrappedRequest,
            ResponseFormat = WebMessageFormat.Json, RequestFormat = WebMessageFormat.Json)]
        string LOGIN(string username, string password);

        [OperationContract]
        [WebInvoke(Method = "GET", BodyStyle = WebMessageBodyStyle.WrappedRequest,
        ResponseFormat = WebMessageFormat.Json, RequestFormat = WebMessageFormat.Json)]
        string LOGIN2(string username, string password);
    }
}