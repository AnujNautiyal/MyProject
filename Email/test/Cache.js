/*
This file is creating cache of all the user who has registered but not activated there account
So here we are mantaining hash, so when one click on link it will be added to Db
*/
var HashMap = require('hashmap');
var db      = require('../Database/db');
var map = new HashMap();

var Cache =
{
insert: function(data,hash){
map.set(hash,data);
},

main: function(req,res,next){
  console.log("Link clicked");
  if(req.session.open!=1){
    var txt =req.url;
    var data = map.get(txt.split('?')[1]);
    console.log(data);
    if(data == undefined){  /*unspecified link*/
      req.session.hmsg = 'Invalid Link register again';
      res.redirect('/');
    }
    else {
      data = data.split('?');
      map.remove(txt.split('?')[1]); /*Delete link from cache so cant be used again*/
      var ctime = new Date().getTime()
      console.log("Time"+ctime+","+data[3]);
      if(ctime - data[3] <300000)/*Less Than 5 min*/{
        db.insert(data[0],data[1],data[2],function(result){
          req.session.hmsg = 'Account activated Please login';
          res.redirect('/');
        });
      }
      else {
        req.session.hmsg = 'Link expired register again';
        res.redirect('/');
      }
    }
  }/*Session open*/
  else {
    req.session.umsg = 'Please Logout and try again';
    res.redirect('/HomePage');
  }
}

}/*Cache*/

module.exports = Cache;
