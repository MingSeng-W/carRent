/**
 * Created by wanghongjie on 16/6/5.
 */

var express=require('express');
var router=express.Router();

//修车列表
router.get('/:status',function(req,res,next){

});
//添加修车记录
router.post('/add',function(req,res,next)
{


});
//删除修车记录
router.post('/:id/delete',function(req,res,next){

});
//修改修车记录

router.post('/:id/update',function(req,res,next){

});

module.exports=router;
