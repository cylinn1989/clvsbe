/**
 * Created by Linn on 2017/3/6.
 */
var multer = require('multer');
var fs = require('fs');
var express = require('express');
var router = express.Router();
router.get('/', function(req, res, next) {
    return res.render('upload');
});

router.post('/', multer({dest: __dirname + '/../upload/'}).array('file'), function (req, res, next) {
    var responseJson = {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        origin_file: req.files[0]// 上传的文件信息
    };
    console.log("fileinfo:")
    console.log(req.files[0]);
    console.log(req.body);
    var src_path = req.files[0].path;
    var des_path = req.files[0].destination + req.files[0].originalname;

    fs.rename(src_path, des_path, function (err) {
        if (err) {
            throw err;
        }

        fs.stat(des_path, function (err, stat) {
            if (err) {
                throw err;
            }

            responseJson['upload_file'] = stat;
            // console.log(responseJson);

            res.json(responseJson);
        });
    });

    // console.log(responseJson);
});

module.exports = router;
