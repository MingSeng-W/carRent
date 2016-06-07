/**
 * Created by wanghongjie on 16/6/5.
 */

var express=require('express');
var router=express.Router();
var multer=require('multer');
var upload=multer();
var moment=require('moment');
var model=require('../model/model');
var databasefunc=require('../commonFuc/databasefunc');

//汽车可借状态封装
var carRepairStatusUpdate=function(carIndexNum,next){
    model.car.update({carIndexNum:carIndexNum},{$set:{isUnderRepairing:'0'}},function(err){
        databasefunc.errhandler(err,next);
    });
};

//修车列表
router.get('/',function(req,res,next){
       model.repair.find({},function(err,doc){
           databasefunc.errhandler(er,next);
           databasefunc.databaseRenderPage(res,next,'repairList',{repairs:doc})
       })
});
//添加修车记录
router.post('/add',upload.array(),function(req,res,next)
{
    var temp=req.body;
    model.car.update({carIndexNum:parseInt(temp.carIndexNum)},{$set:{isUnderRepairing:'1'}},function(err){
        databasefunc.errhandler(err,next);
    });
    model.repair.count({},function(err,index){
        if(err) return next(err);
        model.repair.create({
            repairDate:moment(temp.repairDate,'YYYY-MM-DD HH:mm'),
            repairIndex:index+1,
            carIndexNum:parseInt(temp.carIndexNum),
            amount:parseFloat(temp.amount),
            status:'0'
        },function(err){
            //if(err) return next(err);
            databasefunc.errhandler(err,next);
            databasefunc.databaseRightWithJson(err,res);
            //res.json({status:"0",msg:"成功",data:{}})
        })

    });



});
//删除修车记录
router.post('/:id/delete',function(req,res,next){
    //确保已经修完了才能删除
    //    model.repair.findById(req.params.id,function(err,doc){
    //        databasefunc.errhandler(err,next);
    //       carRepairStatusUpdate(doc.carIndexNum,next);
    //
    //    });
    model.repair.findById(req.params.id,function(err,doc){
        databasefunc.errhandler(err,next);
            if(doc.isFinish=="0"){
                res.json({status:'-1',msg:"维修未完成",data:{}});
                return
            }
        model.repair.update({_id:req.params.id},{$set:{status:'1'}},function(err){
            databasefunc.databaseRightWithJson(err,res,next);
        });
    });



});
//查询所有可以使用的汽车
router.post('/getAllAvaliableCar',function(req,res,next){
    model.car.find({isRent:'0',isUnderRepairing:'0'},function(err,doc){
        //if(err) return next(err);
        databasefunc.errhandler(err,next);
        databasefunc.databaseDataWithJson(err,res,{cars:doc});
        //res.json({status:"0",msg:"正常",data:{cars:doc}});
    })
});

//修改修车记录

router.post('/:id/update',upload.array(),function(req,res,next){
    var temp=req.body;
    model.repair.update({_id:req.params.id},{$set:{amount:parseFloat(temp.amount),repairDate:moment(temp.repairDate,"YYYY-MM-DD HH:mm")}},function(err){
        databasefunc.errhandler(err,next);
        //carRepairStatusUpdate(parseInt(temp.carIndexNum),next);
        databasefunc.databaseRightWithJson(err,res);
    });


});
router.post('/:id/finish',function(req,res,next){
    model.repair.findById(req.params.id,function(err,doc){
        databasefunc.errhandler(err,next);
       carRepairStatusUpdate(doc.carIndexNum,next);
        model.repair.update({_id:req.params.id},{$set:{isFinish:'1'}},function(err){
           databasefunc.errhandler(err,next);
        });
        databasefunc.databaseRightWithJson(err,res);
    })
});
module.exports=router;
