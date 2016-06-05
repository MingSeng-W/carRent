/**
 * Created by wanghongjie on 16/6/5.
 */
var mongoose=require('mongoose');
mongoose.connect('mongodb://localhost/carrent');

var car=new mongoose.Schema({
    carIndexNum:ObjectId,
    carnum:{type:Number,unique:true},
    description:{
        photo:String,
        info:String,
        brand:String
    },
    isRent:Boolean,
    rentPriceInfo:String
});


var repair=new mongoose.Schema(
    {
        repairDate:Date,
        repairIndex:ObjectId,
        carIndexNum:Number,
        amount:Number

    }
);

var order=new mongoose.Schema({
    orderIndex:ObjectId,
    carIndexNum:Number,
    brrowDate:Date,
    returnDate:Date,
    person:{
        name:String,
        age:String,
        idcard:Number,
        bankcard:Number,
        licenseNumber:Number,
        address:String
    },
    getcarLocation:String,
    amount:Number
});

var admin=new mongoose.Schema({
    username:ObjectId,
    password:String
});

exports.car=mongoose.model('car',car);
exports.repair=mongoose.model('repair',repair);
exports.order=mongoose.model('order',order);
exports.admin=mongoose.model('admin',admin);