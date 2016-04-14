//Login Page
var db = require('../Database/db');
var qs = require('./extractPostData');
var crypt = require('./cipher');

var login = {
  main:function(req,res) {
    console.log("Login Main function");
    /*Extract post data*/
    qs.main(req,res, function extract_res(result){
      var email =  result.lemail;
      var pswd = result.lpswd;
      /*Try to login*/
      var query= "SELECT * FROM Person where Email = '"+email+"'";
      db.custom(query, function(result,rows){
        if(result == 1){
          if(rows==undefined){
            res.redirect('/show?msg=DB error');
          }
          else if(rows.length!=1){
            res.redirect('/show?msg=No user exist');
          }
          else{
            if(rows[0].Password==crypt.cipher(pswd)){
              /*session start*/
              req.session.open =1;
              /*myArticle default setting*/
              req.session.mpage =0;
              req.session.morder ="Created";
              /*otherArticle default setting*/
              req.session.opage =0;
              req.session.oorder ="Created";
              /*storing my id in session */
              req.session.email = email;
              //console.log("User logged in ",req.session.email);
              /*Move to home Page*/
              res.redirect('/home');
            }
            else {
              res.redirect('/show?msg=Wrong Password');
            }
          }
        }
        else{
            res.redirect('/show?msg=DB error');
        }
      });/*Db_custome*/
    });/*extract*/
  }/*main*/

};/*login*/

module.exports=login;
