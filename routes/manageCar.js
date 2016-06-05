/**
 * Created by wanghongjie on 16/6/5.
 */

var express=require('express');
var router=express.Router();
var car =require('../model/model').car;
var app=require('../app');
var multer=require('multer');
var upload=multer({dest:'./public/images'});

//汽车列表
router.get('/:status/list',function(){

});

//添加汽车

router.post('/add',upload.single('carpic'),function(req,res,next){
    var abspath=app.use('carPhoto');
    var index=car.find({}).count();
    car.save({
        carIndexNum:index+1,



    },function(err){
        if(err) return next(err);
    })
});
//删除汽车
router.post('/:id/delete',function(req,res,next){

});

//更新汽车信息
router.post('/:id/updateinfo',function(req,res,next){

});

module.exports=router;
