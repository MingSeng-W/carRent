/**
 * Created by wanghongjie on 16/6/5.
 */
var express=require('express');
var router=express.Router();
var app=require('../app');
var order=require('../model/model').order;
var car=require('../model/model').car;
var databasehandler=require('../commonFuc/databasefunc');
var multer=require('multer');
var upload=multer();
var moment=require('moment');

//租借列表
router.get('/',function(req,res,next){
    order.find({}).exec(function(err,orders){
        if(err) return next(err);
        //res.json({orders:orders})
        res.render('orderList',{data:{
            title:'租借列表',orders:orders
        }})
    })
});



//增加租车记录
router.post('/add',upload.array(),function(req,res,next){
//添加到订单表
    order.count({},function(err,index){
        var tmp=req.body;
        //console.log(tmp);
        if(err) return next(err);
        order.create({
            orderIndex:index+1,
            carIndexNum:parseInt(tmp.carIndexNum,10),
            rent:{
                brrowDate:moment(tmp.brrowDate,"YYYY-MM-DD HH:mm"),
                status:"0"
            },
            person:{
                name:tmp.name,
                age:tmp.age,
                idcard:tmp.idcard,
                bankcard:tmp.bankcard,
                licenseNumber:tmp.licenseNumber,
                address:tmp.address
            },
            status:"1"

        },function(err){
            if(err) return next(err);
            //修改汽车集合的汽车的可借状态
            car.update({'carIndexNum':tmp.carIndexNum},{$set:{isRent:'1'}},function(err){
                if(err) next(err);
                order.find({orderIndex:index+1},function(err,doc){
                    if(err) next(err);
                    res.json({status:"0",msg:'正常',data:{

                    }})
                });
            })

        })

    });

});

//获得可借的车辆编号
router.post('/getAvaliableCar',function(req,res,next){
    car.find({isRent:'0'},function(err,cars){
        if(err) return next(err);
        if(cars.length==0){
            res.json({status:"-1",msg:"异常",data:{

            }})
        }
        res.json({status:"0",msg:"正常",data:{
            cars:cars
        }})
    })
});

//修改租车记录
router.post('/:id/update',upload.array(),function(req,res,next){
    var temp =req.body;
    order.findById(req.params.id,function(err,doc){
        car.update({carIndexNum:doc.carIndexNum},{$set:{isRent:'0'}},function(err){
            if(err) return next(err);
            car.update({carIndexNum:parseInt(temp.carIndexNum)},{$set:{isRent:'1'}},function(err){
                if(err) next(err);
            })
        })
    });
    order.update({_id:req.params.id},{$set:{

        //修改车辆
        carIndexNum:parseInt(temp.carIndexNum),
        person:{
            name:temp.name,
            age:temp.age,
            idcard:temp.idcard,
            bankcard:temp.bankcard,
            licenseNumber:temp.licenseNumber,
            address:temp.address
        }
    }},function(err){
        databasehandler.databaseWithJson(err,res,next);
    });

});


//删除租车记录
router.post('/:id/delete',function(req,res,next){
    order.findOne({},function(err,doc){
        if(doc.status=="1"){
            res.json({status:'-1',msg:'不能删除正在进行的交易',data:{}})
            return
        }
    });
    order.update({_id:req.params.id},{$set:{rent:{
        status:'1'
    }}},function(err){

        if(err) return next(err);
        order.findById(req.params.id,function(err,doc){
            car.update({carIndexNum:doc.carIndexNum},{$set:{isRent:'0'}},function(err){
                databasehandler.databaseWithJson(err,res,next);
            })
        })
})
});


module.exports=router;




