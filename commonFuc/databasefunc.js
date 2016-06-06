/**
 * Created by wanghongjie on 16/6/6.
 */

var errhandler=function(err,next){
    if(err) return next(err);

};
exports.databaseWithJson=function(err,res,next){
  errhandler(err,next);
    res.json({status:"0",msg:"正常"})
};

exports.databaseWithRender=function(err,res,next){
   errhandler(err,next);
    res.render()
};