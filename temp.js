app.post('/yourapi', function(req, res, next) { //获取参数
    var query = req.query;  //签名
    var signature = query.signature;  //输出的字符，你填写的TOKEN
    var echostr = query.echostr;  //时间戳
    var timestamp = query['timestamp'];  //随机字符串
    var nonce = query.nonce;
    var oriArray = new Array();
    oriArray[] = nonce;
    oriArray[] = timestamp;
    oriArray[] = appConfig.token; //排序参数
    oriArray.sort();
    var original = oriArray[]+oriArray[]+oriArray[];  //加密
    var scyptoString = sha(original);  //判断是否与你填写TOKEN相等
    if (signature == scyptoString) { //获取xml数据

 req.on("data", function(data) { //将xml解析 parser.parseString(data.toString(), function(err, result) { var body = result.xml; var messageType = body.MsgType[]; //用户点击菜单响应事件 if(messageType === 'event') { var eventName = body.Event[]; (EventFunction[eventName]||function(){})(body, req, res); //自动回复消息 }else if(messageType === 'text') { EventFunction.responseNews(body, res); //第一次填写URL时确认接口是否有效 }else { res.send(echostr); } }); }); } else {  //认证失败，非法操作 res.send("Bad Token!");  } }); //微信客户端各类回调用接口 var EventFunction = { //关注 subscribe: function(result, req, res) { //存入openid 通过微信的接口获取用户的信息同时存入数据库。 }, //注销 unsubscribe: function(openid, req, res) { //删除对应id }, //打开某个网页 VIEW: function() { //根据需求，处理不同的业务 }, //自动回复 responseNews: function(body, res) { //组装微信需要的json var xml = {xml: { ToUserName: body.FromUserName, FromUserName: body.ToUserName, CreateTime: + new Date(), MsgType: 'text', Content: '编辑@+您想说的话，我们可以收到'}}; var reciviMessage = body.Content[] if(/^\@.*/.test(reciviMessage)) { xml.xml.Content = '已经收到您的建议，会及时处理！'}<br>//将json转为xml xml = builder.buildObject(xml);<br>//发送给微信 res.send(xml); } }