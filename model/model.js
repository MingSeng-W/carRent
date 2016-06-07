/**
 * Created by wanghongjie on 16/6/5.
 */
var mongoose=require('mongoose');
mongoose.connect('mongodb://localhost/carrent');
var car=new mongoose.Schema({
    carIndexNum:Number,
    carNum:{type:String,unique:true},
    //description:{
        photo:String,
        info:String,
        brand:String,
    //},
    isRent:String,
    //isRent:'0'代表可借,'1'代表不可借
    rentPriceInfo:String,
    status:String,
    isUnderRepairing:String
    //0不是,1是
});


var repair=new mongoose.Schema(
    {
        repairDate:Date,
        repairIndex:Number,
        carIndexNum:{type:Number,ref:'car'},
        amount:Number,
        status:String,
        isFinish:String
        //'1'删除,'0'未删除
    }
);

var order=new mongoose.Schema({
    orderIndex:Number,
    carIndexNum:{type:Number,ref:'car'},
    rent:{
        brrowDate:{type:Date,default:Date.now()},
//        '0'未删除,'1'已删除
        status:String
    },

    person:{
        name:String,
        age:String,
        idcard:String,
        bankcard:String,
        licenseNumber:String,
        address:String
    },
    //'0'代表交易完成,'1'代表正在进行中
    status:String

});

var returncar=new mongoose.Schema({
    //carIndexNum:{type:Number,ref:'car'},
    orderIndex:{type:Number,ref:'order'},
    returnDate:Date,
    amount:Number,
    // '0'未删除,'1'已删除
    status:String
});

var admin=new mongoose.Schema({
    username:String,
    password:String,
    status:String
});

exports.car=mongoose.model('car',car);
exports.repair=mongoose.model('repair',repair);
exports.order=mongoose.model('order',order);
exports.admin=mongoose.model('admin',admin);
exports.returncar=mongoose.model('returncar',returncar);
