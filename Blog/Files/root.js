/*
Root Page
*/
var db = require('../Database/db');

var root={

main : function(req,res,next)
{
  if(req.session.open){
    res.redirect('/home');
  }
  else{
    req.session.page=0;
    req.session.order="Created";
    req.session.open=0;

    console.log("Root Page");

    /*Connect to Db*/
    db.connect(function(result){
      res.redirect('/show');
    });
 }
},
}

module.exports = root;
