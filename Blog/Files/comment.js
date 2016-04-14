/*
Functions related to comments create, delete and vote
*/
var db = require('../Database/db');
var qs = require('./extractPostData');

var comment={
create : function(req,res,next)
{
    /*Determine author name */
    if(req.session.open){
      author = req.session.email;
    }
    else {
      author="Guest";
    }
  /*insert into Db*/
  var data = {Bid:res.postdata.Bid, Content:res.postdata.Content, Author:author,Vote:0};
  db.insert("Comments",data,function(){
    req.query.id =res.postdata.Bid;
    res.redirect('/blog?id='+res.postdata.Bid);
    next();
  });
},

update : function(req,res,next)
{
  if(req.query.Action=="Like"){ //Increase Vote
    console.log("Like");
    db.update("Comments","Vote",parseInt(req.query.Vote)+1,"Id",req.query.Id,function(){
      req.query.id =req.query.Bid;
      res.redirect('/blog?id='+req.query.id);
    });
  }
  else {//Delete Comment
    db.delete("Comments","Id",req.query.Id,function(){
      req.query.id =req.query.Bid;
      console.log(req.query.id);
      res.redirect('/blog?id='+req.query.id);
    });
    console.log("Delete");
  }
}

}

module.exports = comment;
