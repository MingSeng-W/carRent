/**
 * Created by wanghongjie on 16/6/5.
 */
var express=require('express');
var router=express.Router();
var multer=require('multer');
var upload=multer();
var car=require('../model/model').car;
var order=require('../model/model').order;
var returncar=require('../model/model').returncar;
var moment=require('moment');

//增加还车记录
router.post('/add',upload.array(),function(req,res,next){
        var temp=req.body;
   //涉及到car表和order表
    order.find({orderIndex:parseInt(temp.orderIndex)},function(err,doc){
        car.update({carIndexNum:doc[0].carIndexNum},{$set:{
            isRent:'0'
        }},function(err){
            if(err) return next(err);
        });
    });
    order.update({orderIndex:parseInt(temp.orderIndex)},{$set:{status:'0'}},function(err){
        if(err) return next(err);
    });

    returncar.create({
        //carIndexNum:parseInt(temp.carIndexNum,10),
        orderIndex:parseInt(temp.orderIndex),
        returnDate:moment(temp.returnDate,'YYYY-MM-DD HH:mm'),
        amount:parseFloat(temp.amount),
        status:'0'

    },function(err){
        if(err) return next(err);
        res.json({status:'0',msg:'',data:{}})
    })


});
//还车记录列表
router.get('/',function(req,res,next){
    returncar.find({status:'0'},function(err,doc){
        if(err) return next(err);
        res.render('returnCarList',{title:"还车列表",returnLogs:doc})
    })
});
//删除还车记录
router.post('/:id/delete',upload.array(),function(req,res,next){
//查询
    returncar.update({_id:req.params.id},{$set:{status:'1'}},function(err){
        if(err) next(err);
    })
});
//修改还车记录
router.post('/:id/update',upload.array(),function(req,res,next){
    returncar.update({_id:req.params.id},{$set:{amount:req.body.amount,retunDate:req.body.retunDate}},function(err){
        if(err) return next(err);
    })
});

module.exports=router;
