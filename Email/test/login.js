/*
This File is used for logging in user
*/
var db = require('../Database/db');

var login = {

main:function(req,res) {
  console.log("Login Main function");
  var email = req.query.email;
  var pswd  = req.query.pswd;

  db.connect(function(result){
    if(result == 0){
      res.render('index', { title: 'Express', Res: 'DB error' });
      cb(0);
    }
    else{
      db.select(email,pswd, function(result,output){
        if(result == 1){
          req.session.open =1;
          res.redirect('/HomePage');
        }
        else if(result == 2){
          req.session.hmsg = 'Wrong Password';
          res.redirect('/');
          //res.render('index', { title: 'Express', Res: 'Wrong Password' });
        }
        else if(result == 3){
          req.session.hmsg = 'No user found';
          res.redirect('/');
          //res.render('index', { title: 'Express', Res: 'No user found' });
        }
        else if(result == 4){
          req.session.hmsg = 'DB error';
          res.redirect('/');
          //res.render('index', { title: 'Express', Res: 'DB error' });
        }
      });/*select*/
    }
  });/*connect*/
}/*main*/

};/*login*/

module.exports=login;
