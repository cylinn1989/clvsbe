/**
 * Created by linsiyu on 2017/2/12.
 */
var base = require('./base');
var ObjectId = base.ObjectId;
var UserScheme =new base.Schema({
    uid: String,
    pwd: String
});
UserScheme.index({mobile:1},{"background" : true});//设置索引
var UserEntity = base.mongoose.model('UserEntity',UserScheme,'users');//指定在数据库中的collection名称为user
exports.user  = UserEntity;//导出实体