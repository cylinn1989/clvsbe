function initTable() {

    var queryUrl = '@Url.Content("~/Welcome/QueryList")' + '?rnd=' + +Math.random();

    $table = $('#table-javascript').bootstrapTable({

        //method: 'get',<br><br>
        method: 'post',
        contentType: "application/x-www-form-urlencoded",//必须的，操你大爷！！！！
    url: queryUrl,

        height: $(window).height() - 200,

        striped: true,

        pagination: true,

        singleSelect: false,

        pageSize: 50,

        pageList: [10, 50, 100, 200, 500],

        search: false, //不显示 搜索框

        showColumns: false, //不显示下拉框（选择显示的列）

        sidePagination: "server", //服务端请求

        queryParams: queryParams,

        minimunCountColumns: 2,

        columns: [{

        field: 'state',

        checkbox: true

    }, {

        field: 'Name',

        title: '姓名',

        width: 100,

        align: 'center',

        valign: 'middle',

        sortable: true,

        formatter: nameFormatter

    }, {

        field: 'Gender',

        title: '性别',

        width: 40,

        align: 'left',

        valign: 'top',

        sortable: true,

        formatter: sexFormatter,

        sorter: priceSorter

    }, {

        field: 'Birthday',

        title: '出生日期',

        width: 80,

        align: 'left',

        valign: 'top',

        sortable: true

    }, {

        field: 'CtfId',

        title: '身份证',

        width: 80,

        align: 'middle',

        valign: 'top',

        sortable: true

    }, {

        field: 'Address',

        title: '地址',

        width: 180,

        align: 'left',

        valign: 'top',

        sortable: true

    }, {

        field: 'Tel',

        title: '固定电话',

        width: 100,

        align: 'left',

        valign: 'top',

        sortable: true

    }, {

        field: 'Mobile',

        title: '手机号码',

        width: 100,

        align: 'left',

        valign: 'top',

        sortable: true

    }, {

        field: 'operate',

        title: '操作',

        width: 100,

        align: 'center',

        valign: 'middle',

        formatter: operateFormatter,

        events: operateEvents

    }],

        onLoadSuccess:function(){



    },

    onLoadError: function () {

        mif.showErrorMessageBox("数据加载失败！");

    }

});

}

//传递的参数

function queryParams(params) {

    return {

        pageSize: params.pageSize,

        pageIndex: params.pageNumber,

        UserName: $("#txtName").val(),

        Birthday: $("#txtBirthday").val(),

        Gender: $("#Gender").val(),

        Address: $("#txtAddress").val(),

        name: params.sortName,

        order: params.sortOrder

    };

}

服务器端代码：

public ActionResult QueryList(int pageIndex = 1, int pageSize = 100)

{

    try

    {

        string name = Request["UserName"];

        string birthday = Request["Birthday"];

        string gender = Request["Gender"];

        string Address = Request["Address"];

        Document docQuery = new Document();

        if (!string.IsNullOrEmpty(name))

        {

            docQuery.Add("Name", new MongoRegex(".*" + name + ".*", MongoRegexOption.IgnoreCase));

        }

        if (!string.IsNullOrEmpty(birthday))

        {

            docQuery.Add("Birthday", new MongoRegex(".*" + birthday + ".*", MongoRegexOption.IgnoreCase));

        }

        if (!string.IsNullOrEmpty(gender))

        {

            docQuery.Add("Gender", gender);

        }

        if (!string.IsNullOrEmpty(Address))

        {

            docQuery.Add("Address", new MongoRegex(".*" + Address + ".*", MongoRegexOption.IgnoreCase));

        }

        if (this.HttpContext.Request.QueryString.AllKeys.Contains("ToExcel"))

        {

            List<OpenRoom> listExport = MongoDbHelper.GetList<OpenRoom>(MongoTables.OpenRoom, docQuery);

            //List<string> listTilte = new List<string> { "" };

            ExportMethod(listExport);

        }

        long totalCount = MongoDbHelper.GetTotalCount<OpenRoom>(MongoTables.OpenRoom, docQuery);

        var list = MongoDbHelper.GetList<OpenRoom>(MongoTables.OpenRoom, docQuery, new Document(), pageIndex, pageSize);

        string jsonString = JsonHelper.ObjToJson(list);

        jsonString = "{\"total\":" + totalCount.ToString() + ",\"rows\":" + jsonString + "}";

        return Content(jsonString);

    }

    catch (Exception ex)

    {

        return Content(ex.Message);

    }



}