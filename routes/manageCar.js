/**
 * Created by wanghongjie on 16/6/5.
 */

var express=require('express');
var router=express.Router();
var car =require('../model/model').car;
var app=require('../app');
var multer=require('multer');
var upload=multer({dest:'./public/upload'});

//汽车列表

router.get('/',function(req,res,next){
    car.find({status:"0"},function(err,cars){
        if(err) return next(err);
        res.json({cars:cars});
        //res.render('carList',{title:"汽车列表",cars:cars})
    })
});


//添加汽车

router.post('/add',upload.single('carpic'),function(req,res,next){
    //var abspath=app.use('carPhoto');
    car.count({},function(err,index)
    {
        if(err) return next(err);
        car.create({
            carIndexNum:index+1,
            carNum:req.body.car.carNum,
            photo:'upload/'+req.file.filename,
            info:req.body.car.info,
            brand:req.body.car.brand,
            isRent:req.body.car.isRent,
            rentPriceInfo:req.body.car.rentPriceInfo,
            status:"0"
        },function(err){
            if(err) return next(err);
            res.redirect('/car');
            //res.send('成功')

        })
    });

});
//删除汽车
router.post('/:id/delete',function(req,res,next){
    car.find({_id:req.params.id},function(req,doc){
       if(!doc){
           res.json({status:"-1",msg:"不存在该id"})
       }
        car.update({_id:req.params.id},{$set:{status:"-1"}},function(err){
            if(err) return next(err);
            res.json({status:"0",msg:"删除成功"})

        });
    });

});

//更新汽车信息
router.post('/:id/updateinfo',update.single('carpic'),function(req,res,next){
    car.find({_id:req.params.id},function(err,doc){
        if(!doc){
            res.json({status:"-1",msg:"不存在该id"})
        }
        car.update({_id:req.params.id},{$set:{photo:'upload/'+req.file.filename,info:req.body.car.info,
            brand:req.body.car.brand,isRent:req.body.car.isRent,rentPriceInfo:rea.body.car.rentPriceInfo}});
    });

});

module.exports=router;
