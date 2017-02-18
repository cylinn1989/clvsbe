var express = require('express');
var router = express.Router();
var user = require('../models/user').user;


/* GET home page. */
router.get('/', function(req, res, next) {
    if(req.session.user)
        return res.redirect('/home/logined');
    return res.render('login', { title: 'LOGIN',message:req.session.error});
});

router.post('/',function(req,res,next){
    // var user={
    //     username:'admin',
    //     password:'admin'
    // };
    var query_doc = {uid: req.body.username, pwd: req.body.password};
    user.count(query_doc, function(err, doc){
        if(doc >= 1){
            console.log(query_doc.uid + ": login success in " + new Date()+query_doc.pwd);
            req.session.user = query_doc;
            return res.redirect('/home/logined');
        }else{
            console.log(query_doc.uid + ": login failed in " + new Date()+query_doc.pwd);
            req.session.error = "用户名或密码错误";
            return res.redirect('/home');
        }
    });
    // if(req.body.username===user.username && req.body.password===user.password){
    //     req.user = user;
    //     req.session.user = user;
    //     return res.redirect('/home/logined');
    // }
    // req.session.error = "用户名或密码错误";
    // return res.redirect('/home');
});

router.get('/logined', function(req, res, next) {
    if(req.session.user)
        return res.render('home', { title: 'Home' });
    else{
        req.session.error = "请先登录";
        return res.redirect('/home');
    }
});

router.get('/logout',function(req,res,next){
    req.session.user=null;
    req.session.error=null;
    return res.redirect('/home')
});

router.get('/getuser',
    function (req,res,next) {
        if(req.session.user){
        //     var users = [{"uid":"","pwd":""}];   {"total":24,"rows":[...]}
            user.find({},[],function (err,users) {
                console.log(users.length);
                var json = {total:users.length,rows:[]}
                for(i=0;i<user.length;i++)
                    json.rows.push(users[i]);
                json.rows.pop();
                console.log(json);
                res.send(json);
            });

        }
        else{
            req.session.error = "请先登录";
            return res.redirect('/home');
        }
})


module.exports = router;
