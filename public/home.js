$(function () {

    //1.初始化Table
    var oTable = new TableInit();
    oTable.Init();

    // //2.初始化Button的点击事件
    var oButtonInit = new ButtonInit();
    oButtonInit.Init();
});


var TableInit = function () {

    var oTableInit = new Object();
    //初始化Table
    oTableInit.Init = function () {
        $('#tb_user').bootstrapTable({
            url: '/home/getuser',         //请求后台的URL（*）
            // data:user_json,
            method: 'get',                      //请求方式（*）
            dataType:"json",
            toolbar: '#toolbar',                //工具按钮用哪个容器
            striped: true,                      //是否显示行间隔色
            cache: false,                       //是否使用缓存，默认为true，所以一般情况下需要设置一下这个属性（*）
            pagination: true,                   //是否显示分页（*）
            sortable: false,                     //是否启用排序
            sortOrder: "asc",                   //排序方式
            queryParams: oTableInit.queryParams,//传递参数（*）
            sidePagination: "server",           //分页方式：client客户端分页，server服务端分页（*）
            pageNumber:1,                       //初始化加载第一页，默认第一页
            pageSize: 10,                       //每页的记录行数（*）
            pageList: [10, 25, 50, 100],        //可供选择的每页的行数（*）
            search: true,                       //是否显示表格搜索，此搜索是客户端搜索，不会进服务端，所以，个人感觉意义不大
            strictSearch: true,
            showColumns: true,                  //是否显示所有的列
            showRefresh: true,                  //是否显示刷新按钮
            minimumCountColumns: 1,             //最少允许的列数
            clickToSelect: true,                //是否启用点击选中行
            height: 500,                        //行高，如果没有设置height属性，表格自动根据记录条数觉得表格高度
            uniqueId: "pwd",                     //每一行的唯一标识，一般为主键列
            showToggle:true,                    //是否显示详细视图和列表视图的切换按钮
            cardView: false,                    //是否显示详细视图
            detailView: false,                   //是否显示父子表
            columns: [{
                checkbox: true
            }, {
                field: 'uid',
                title: '用户名'
            }, {
                field: 'pwd',
                title: '密码'
            }],
            // onExpandRow: function (index, row, $detail) {
            //     oInit.InitSubTable(index, row, $detail);
            // }
            onDblClickRow:function(item, $element){resource_addWindow(item.oid);}
        });
    };
//
    //得到查询的参数
    oTableInit.queryParams = function (params) {
        var temp = {   //这里的键的名字和控制器的变量名必须一直，这边改动，控制器也需要改成一样的
            limit: params.limit,   //页面大小
            offset: params.offset,  //页码
            uid: $("#uid").val(),
            pwd: $("#pwd").val()
        };
        return temp;
    };
    return oTableInit;
};


var ButtonInit = function () {
    var oInit = new Object();
    var postdata = {};

    oInit.Init = function () {
        //按钮事件--新建
        $("#btn_add").click(function () {
            // $("#myModalLabel").text("新增");
            // $("#myModal").find(".form-control").val("");
            $('#new').modal('show');

            // postdata.DEPARTMENT_ID = "";
        });

        //按钮事件--删除
        $("#btn_delete").click(function () {
            var selRow = $('#tb_user').bootstrapTable('getSelections');
            if(selRow){
                var datas = {total:selRow.length,rows:[]};
                for(var i=0;i<selRow.length;i++) {
                    datas.rows.push({uid: selRow[i].uid, pwd: selRow[i].pwd});
                }
                $.ajax({
                    type: "POST",
                    cache: false,
                    async: true,
                    dataType: "json",
                    url: '/home/deleteuser',
                    data: datas,
                    success: function (data) {
                        alert(data.result);
                        if (data.result == "Success")
                    // $table.bootstrapTable('hideRow', {index: 1}
                            $('#message-text').html("删除成功");
                        else
                            $('#message-text').html("删除失败:"+data.err);
                        $('#message').modal('show');
                        $('#tb_user').bootstrapTable('refresh');
                    }
                })
            }
        });

        //按钮事件--新建保存
        $("#btn_new_save").click(function () {
            var datas = {"uid": $('#txt_new_uid').val(), "pwd": $('#txt_new_pwd').val()};
            $.ajax({
                type: "POST",
                cache: false,
                async: true,
                dataType: "json",
                url: '/home/newuser',
                data: datas,
                success: function (data) {
                    alert(data.result);
                    if (data.result == "Success")
                        // $table.bootstrapTable('hideRow', {index: 1});
                        $('#message-text').html("新建成功");
                    else
                        $('#message-text').html("新建失败");
                    $('#new').modal('hide');
                    $('#message').modal('show');
                    $('#tb_user').bootstrapTable('refresh');
                    // if (reLoad) {
                    //     $table.bootstrapTable('refresh');
                    // }
                }
            })
        });


    }
    return oInit;
}