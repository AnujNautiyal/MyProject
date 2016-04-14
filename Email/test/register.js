/*
This file is used for registering user, here we send mail to user and add to cache(map) so that when he click the
link we can take data from cache(map) and add to Db. 
*/
var db      = require('../Database/db');
var mail    = require('./email');
var fs      = require('fs');
var Cache   = require('./Cache');
var crypto  = require('crypto');

var register = {
main: function(req,res) {
  var email = req.query.remail;
  var pswd = req.query.rpswd;
  var name = req.query.rname
db.connect(function (result){
  if(result == 0){
    req.session.hmsg = 'DB error ';
    res.redirect('/');

  }
  else{
    console.log("Starting query");
      db.select(email, pswd,function(result){
      if(result == 1||result==2){
        req.session.hmsg = 'Choose different id';
        res.redirect('/');
      }
      else if(result == 3){/*send mail to activate */
        var data = email+"?"+pswd+"?"+name+"?"+new Date().getTime();
        console.log("_Register_"+data);
        var md5sum = crypto.createHash('md5').update(data).digest('hex');
        console.log("_Register_"+md5sum);
        Cache.insert(data,md5sum);
        console.log("_Register_Send Email");
            /*Send Mail*/
            var options={
                    to : email,
                    subject : "Register",
                    text : "Below Link will expire in 5 min http://localhost:3000/link?"+md5sum
                }
            mail.main(options);
            req.session.hmsg = 'Please click on link in your email to activate';
            res.redirect('/');
      }
    });/*select*/
  }
});/*connect*/
}/*main*/

};/*register*/
module.exports = register;
