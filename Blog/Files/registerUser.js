/*Register Page*/
var db   = require('../Database/db');
var qs   = require('./extractPostData');
var crypt = require('./cipher');

var register = {
main: function(req,res) {
  qs.main(req,res, function extract_res(result){
    var email = result.remail;
    var pswd  = crypt.cipher(result.rpswd);
    var name  = result.rname;
    console.log("Starting query");
    var query= "SELECT * FROM Person where Email = '"+ email +"'";
    db.custom(query, function(result,rows){
          if(rows==undefined){
            res.redirect('/show?msg=DB error');
          }
          if(rows.length>0){
            res.redirect('/show?msg=Choose different id');
          }
          else{
           var data={Name:name,Email:email,Password:pswd};
           db.insert("Person",data,function(result,row){});
           res.redirect('/show?msg=Idcreated');
          }
      });/*custom*/
   });/*extract*/
}/*main*/

}/*register*/
module.exports = register;
