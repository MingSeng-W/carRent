/**
 * Created by wanghongjie on 16/6/5.
 */
var mongoose=require('mongoose');
mongoose.connect('mongodb://localhost/carrent');
var car=new mongoose.Schema({
    carIndexNum:ObjectId,
    carNum:{type:String,unique:true},
    description:{
        photo:String,
        info:String,
        brand:String
    },
    isRent:Boolean,
    rentPriceInfo:String,
    status:String
});


var repair=new mongoose.Schema(
    {
        repairDate:Date,
        repairIndex:ObjectId,
        carIndexNum:{type:Number,ref:'car'},
        amount:Number,
        status:Number
    }
);

var order=new mongoose.Schema({
    orderIndex:ObjectId,
    carIndexNum:{type:num},
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
    username:ObjectId,
    password:String,
    status:Number
});

exports.car=mongoose.model('car',car);
exports.repair=mongoose.model('repair',repair);
exports.order=mongoose.model('order',order);
exports.admin=mongoose.model('admin',admin);