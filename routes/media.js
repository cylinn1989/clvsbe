/**
 * Created by Linn on 2017/3/7.
 */
var fs = require('fs');
var rd = require('rd');
var path = require('path');
var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    return res.render('media');
});

var vdo_path = __dirname + "/../media";//视频文件夹路径(可自行更改)
var vdo_info_ls = [];//获取到的文件信息集
function getFileInfo(path) {//遍历文件夹
        try {
            var files = rd.readSync(path);//获取目录下所有文件和文件夹
            for (var i in files) {//循环遍历
                if (!fs.lstatSync(files[i]).isDirectory()) {//判断是否为文件
                    if (files[i].toLowerCase().split(".mp4").reverse()[0].length == 0) {//判断是否为MP4格式文件(这里默认以MP4为例 其他格式大家自行过滤)
                        vdo_info_ls[vdo_info_ls.length] = {
                            name: files[i].split("\\").reverse()[0].replace(".mp4", "").replace(".MP4", ""),//获取文件名
                            url: files[i], //获取文件的web路径
                            mtime: fs.statSync(files[i]).mtime//修改时间作为发布时间
                        }//添加信息到文件信息集
                    }
                }
            }
            console.log(vdo_info_ls);
        }
        catch (e) {
            console.log(e);
        }
}

function reGetFileInfos() {//这里是为了大家以后写后台进行文件刷新时使用
    vdo_info_ls = [];//初始化集合
    getFileInfo(vdo_path); //遍历文件夹
    vdo_info_ls.sort(function (a, b) {//时间排序
        return Date.parse(b.ctime) - Date.parse(a.ctime);//时间正序(不过这个方法好像只能对月日起效 对年好像不起作用)
    });
}
function readBigFileEntry(filename, response) {
        if (!filename ) {
            response.writeHead(404);
            response.end();
            return;
        }

        var readStream = fs.ReadStream(filename);

        var contentType = 'none';
        var ext = path.extname(filename);
        switch (ext) {
            case ".flv":
                contentType = "video/flv";
                break;
        }

        response.writeHead(200, {
            'Content-Type': contentType,
            'Accept-Ranges': 'bytes',
            'Server': 'Microsoft-IIS/7.5',
            'X-Powered-By': 'ASP.NET'
        });


        readStream.on('close', function () {
            response.end();
            console.log("Stream finished.");
        });
        readStream.pipe(response);
}

var page_count = 20;//分页条数
router.get('/getmedia', function (req, res) {
    getFileInfo(vdo_path);
    readBigFileEntry(__dirname+'/../media/CityOfStars.mp4',res);
});
router.get('/getmedialist', function (req, res) {
    getFileInfo(vdo_path);
    return res.send(vdo_info_ls);
});


module.exports = router;