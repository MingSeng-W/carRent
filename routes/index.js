var express = require('express');
var router = express.Router();
var car=require('../model/model').car;
var repair=require('../model/model').repair;
var order=require('../model/model').order;
//主页
router.get('/', function(req, res, next) {
  //显示汽车的轮播图
    var doc1={};
    var doc2={};
    var doc3={};
  car.find({}).limit(5).run(function(err,doc){
    if(err) return next(err);
    if(!doc){
      console.log('请添加足够的车辆信息')
    }
      doc1=doc;});
    //显示最近订单
    order.find({}).limit(5).run(function(err,doc) {
        if (err) return next(err);
        if (!doc) {
            console.log('订单数目不足')
        };
        doc2 = doc;
    });
//显示最近的最近的10个订单
      repair.find({}).limit(5).run(function(err,doc){
        if(err) return next(err);
        if(!doc){
          console.log('维修单数不够')
        }
          doc3=doc;
      });
        res.render('index',{title:'首页',indexcar:doc1,carOrder:doc2,carRepair:doc3})
});


module.exports = router;
