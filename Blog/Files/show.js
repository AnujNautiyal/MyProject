/*
Home page of Guest user who is not logged in
*/
var db     = require('../Database/db');
var cache  = require('./cache');

var rowc  = 10;   /*Number of row to display at a time */
var order,page;

/*configuring of page to display and in which order */
function configure(req,cb){
  if(req.query.Action=="Next")
    req.session.page++;
  else if(req.query.Action=="Prev" /*&& req.session.page!=0*/)
    req.session.page--;
  if(req.query.type!=undefined){
    req.session.order = req.query.type;
    req.session.page=0;
  }
  cb(1);
}


var show={
main : function(req,res,next)
{
  /*configuring of page to display and in which order */
  configure(req,function(res){
    page  = req.session.page;
    order = req.session.order;
  });

  /*Try to get result from cache- Not working*/
  var wrapper_custom = cache.getcache().wrap(db.custom);
  wrapper_custom("SELECT * FROM Blog ORDER BY "+order+" DESC LIMIT "+page*rowc+","+rowc,function(result,data){
     if(result==1)
       res.mydata=data;
     next();
    });

},

display : function(req,res,next){
  //console.log(res.mydata);
  //console.log(res.mydata.length);
  var msg  = req.query.msg;    //Result of query
  var data = res.mydata;      //Blogs to display

  if(res.mydata.length<rowc)    //Last Page
    res.render('show',{results:data,prev:1,msg:msg});
  else if(req.session.page==0)  //First Page
    res.render('show',{results:data,next:1,msg:msg});
  else if(req.session.page!=0)  //Middle Page
    res.render('show',{results:data,prev:1,next:1,msg:msg});
  res.end();
}

}
module.exports = show;
