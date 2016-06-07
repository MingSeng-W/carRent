/**
 * Created by wanghongjie on 16/6/6.
 */

var errhandler=function(err,next){
    if(err) return next(err);

};
exports.databaseRightWithJson=function(err,res){
    res.json({status:"0",msg:"正常",data:{}})
};
exports.databaseErrorWithJson=function(err,res,next){
    //errhandler(err,next);
    res.json({status:"-1",msg:"异常",data:{}})
};
exports.databaseDataWithJson=function(err,res,data){
    res.json({status:"0",msg:"正常",data:data})
};

exports.databaseRenderPage=function(err,res,next,viewname,data){
   //errhandler(err,next);
    res.render(viewname,data)
};

exports.errhandler=errhandler;