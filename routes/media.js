/**
 * Created by Linn on 2017/3/7.
 */
var multer = require('multer');
var fs = require('fs');
var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    return res.render('media');
});



module.exports = router;