/*
This file will send forgot mail to user
*/
var mail    = require('./email');
var db      = require('../Database/db');
var crypto  = require('crypto')
var fcache  = require('./fCache')

var forgot = {

main : function(req,res){
/*CHeck for user exist or not */

var data = req.query.femail+"?"+ new Date().getTime();
console.log("_Forgot_"+data);
var md5sum = crypto.createHash('md5').update(data).digest('hex');
console.log("_Forgot_"+md5sum);
fcache.insert(data,md5sum);

console.log("_Forgot_Send Email");

    /*Send Mail*/
    var options={
            to : req.query.femail,
            subject : "Forgot Password",
            text : "Below Link will expire in 5 min http://localhost:3000/flink?im="+md5sum
        }
    mail.main(options);
    req.session.hmsg = 'Please click on link send to you email';
    res.redirect('/');
}/*main*/,
/*
update:function(req,res){
console.log('Update password');
db.update(req.query.email,req.query.pswd)
}
*/
}/*forgot*/


module.exports = forgot;
