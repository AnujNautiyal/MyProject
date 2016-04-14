/*
This file is used for logging out user
*/
var logout=
{
main:function(req,res,cb){
    req.session.open =0;
    res.redirect('/');
    //req.session.open =0;

}

}/*logout */

module.exports = logout;
