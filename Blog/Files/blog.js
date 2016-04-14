/*
Display a Blog with its comments
*/
var db = require('../Database/db');
var async = require('async');

var blog={

main : function(req,res,next)
{
      /*Get Paralllely both Comments and Article, then display as a whole*/
      async.parallel([
        function(callback) {  //Getting Blog
        db.select_ar("Blog","Id",req.query.id,function(result,data){
          if(result==1)
            res.articledata=data;
            callback();
          });
        },
        function(callback) {  //Getting Comments
          db.select_ar("Comments","Bid",req.query.id,function(result,data){
            if(result==1)
              res.commentdata=data;
              callback();
          });
        }
     ],function(err){
       console.log("Async Done");
       next();
     });
},
display : function(req,res,next){
  var bdata = res.articledata;
  var comment = res.commentdata;

  if(req.session.open){
    var user = req.session.email; /*Show delete button if user same as who has commented*/
    var logout=1;                 /*Show logout Button */
  }
/*Don't know why passing bdata is getting failed, thus using pass*/
  var pass = { Id:bdata[0].Id, Name:bdata[0].Name, Content:bdata[0].Content, Author:bdata[0].Author} ;
  res.render('blog', { Article:pass, Comments:comment,Logout:logout,email:user});
}

}/*var */

module.exports=blog;
