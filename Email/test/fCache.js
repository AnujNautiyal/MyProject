/*
This file is creating cache of all the user who has fogot password mail but not clicked on link
So here we are mantaining hash, so when one click on click it will be added to Db
Need to be merged with Cache.js.
Also it check for link validity and move to next page, it is hardcoded but should be variable 
*/
var HashMap = require('hashmap');
var db      = require('../Database/db');
var map = new HashMap();

var Cache =
{
insert: function(data,hash){
map.set(hash,data);
console.log("fcahce insert");
},

main: function(req,res,next){
  var data =req.query.im;
  //console.log("Forgot Data"+txt);
  var data = map.get(data);
  if(req.session.open!=1){
    if(data == undefined){  /*unspecified link*/
      req.session.hmsg = 'Invalid Link try again';
      res.redirect('/');
    }
    else {
      data = data.split('?');
      map.remove(data); /*Delete link from cache */
      if(new Date().getTime()-data[1]<300000){
        req.session.forgot = 1;
        res.render('forgot' ,{email:data[0]});
        /*show forgot page*/
      }
      else {
        req.session.hmsg = 'Link Expired';
        res.redirect('/');
      }
    }
  }
  else {
    req.session.umsg = 'Please Logout and try again';
    res.redirect('/HomePage');
  }
}
}/*Cache*/

module.exports = Cache;
