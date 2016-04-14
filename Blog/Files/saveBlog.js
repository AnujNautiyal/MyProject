/*
Used to Save blog
*/
var db = require('../Database/db');
var qs = require('./extractPostData');

var save={
main : function(req,res)
{
  console.log("saved");
  db.connect(function(result){
    if(result ==1){
      if(req.session.open){
        Author = req.session.email;
      }
      else {
        Author="Guest";
      }
      qs.main(req,res, function extract_res(result){
        data = 'INSERT INTO Blog values (0,\"'+result.Title+'\",\"'+result.Content+'\",\"'+Author+'\",Now())';
        db.custom(data,function(){
          if(req.session.open){
            res.redirect('/home');
          }
          else {
            res.redirect('/');
          }
        });
      });
    }
    else {
      console.log("Cant conenct to DB");
      res.redirect('/');
    }
  });
}

}

module.exports = save;
