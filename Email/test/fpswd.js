/*
Used to set new password after forgot password link clicked
*/
var db      = require('../Database/db');

var fpswd = {

main:function(req, res, next) {
if(req.session.forgot ==1){
  req.session.forgot = 0;
  console.log("fpswd");
  var email = req.query.email;
  var pswd = req.query.pswd;
  db.connect(function(result){
    if(result == 0){
      req.session.hmsg = 'DB error';
      res.redirect('/');
      //res.render('register', { title: 'Express', Res: });
    }
    else {
      db.update(email,pswd,function(result){
        if(result == 0){
          req.session.hmsg = 'DB error';
          res.redirect('/');
          //res.render('register', { title: 'Express', Res: 'DB error'});
        }
        else {
          req.session.hmsg = 'Password Changed successfully';
          res.redirect('/');
          //res.render('register', { title: 'Express', Res: 'Password Change'});
        }
      });
     }
  });
} /*If for back button issue so that link can be used once*/
else {
  req.session.hmsg = 'Link expired';
  res.redirect('/');
}
}

};

module.exports = fpswd ;
