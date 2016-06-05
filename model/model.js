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
    //isRent:String,
    rentPriceInfo:String,
    status:String
});


var repair=new mongoose.Schema(
    {
        repairDate:Date,
        repairIndex:Number,
        carIndexNum:{type:Number,ref:'car'},
        amount:Number,
        status:Number
    }
);

var order=new mongoose.Schema({
    orderIndex:Number,
    carIndexNum:{type:Number,ref:'car'},
    rent:{
        brrowDate:{type:Date,default:Date.now()},
        status:String
    },

    person:{
        name:String,
        age:String,
        idcard:Number,
        bankcard:Number,
        licenseNumber:Number,
        address:String
    },
    returncar:{
       returnDate:Date,
        status:String
    },
    amount:Number

});

var admin=new mongoose.Schema({
    username:String,
    password:String,
    status:Number
});

exports.car=mongoose.model('car',car);
exports.repair=mongoose.model('repair',repair);
exports.order=mongoose.model('order',order);
exports.admin=mongoose.model('admin',admin);