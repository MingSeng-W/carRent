/**
 * Created by wanghongjie on 16/6/5.
 */
var express=require('express');
var router=express.Router();
//还车记录列表
router.get('/:status',function(req,res,next){

});
//增加还车记录
router.post('/add',function(req,res,next){

});
//删除还车记录
router.post('/:id/delete',function(req,res,next){

});
//修改还车记录
router.post('/:id/update',function(req,res,next){

});

module.exports=router;
