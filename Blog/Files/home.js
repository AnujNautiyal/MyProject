/*
Home Page of logged in user, which displays his and other post 
*/
var async = require('async');
var db = require('../Database/db');
var rowc = 5;
var morder,mpage;   /*My Blogs configuration*/
var oorder,opage;   /*Other Blogs configuration*/

function configure(req,cb){
  /*my Page setting*/
  if(req.query.mAction=="Next")
    req.session.mpage++;
  else if(req.query.mAction=="Prev"/* && req.session.mpage!=0*/)
    req.session.mpage--;

  if(req.query.mtype!=undefined){
    req.session.morder = req.query.mtype;
    req.session.mpage=0;
  }
  /*Other Page settings*/
  if(req.query.oAction=="Next")
    req.session.opage++;
  else if(req.query.oAction=="Prev" && req.session.opage!=0)
    req.session.opage--;

  if(req.query.otype!=undefined){
    req.session.oorder = req.query.otype;
    req.session.opage=0;
  }
  cb(1);
}
var home={
  main:function(req,res,next){
    //console.log('Home'+req.query.mAction);
    configure(req,function(res){
      mpage  = req.session.mpage;
      morder = req.session.morder;
      opage  = req.session.opage;
      oorder = req.session.oorder;
    });
//console.log(mpage,morder,opage,oorder);
//console.log(req.session.mpage,req.session.morder,req.session.opage,req.session.oorder);
    /*get both data my post and others post, must use cache but not working thus skipped */
    async.parallel([
    /*Retrieve my post */
    function(callback) {
      db.custom("SELECT * FROM Blog WHERE Author ='"+ req.session.email +"' ORDER BY "+morder+" DESC LIMIT "+mpage*rowc+","+rowc,function(result,data){
        if(result==1)
          res.mdata=data;
        callback();
      });
     },
     /*Retreiving Other post*/
     function(callback) {
      db.custom("SELECT * FROM Blog ORDER BY "+oorder+" DESC LIMIT "+opage*rowc+","+rowc,function(result,data){
      if(result==1)
        res.odata=data;
         callback();
      });
     }
     ],function(err){
        console.log("Async Done");
        next();
    });
  },

  display:function(req,res){
    //console.log(res.mdata);
    var odata = res.odata;
    var mdata = res.mdata;

    if(res.odata.length<rowc){
      //res.render('home',{oresults:odata,oprev:1});
      if(res.mdata.length<rowc)
        res.render('home',{mresults:mdata,mprev:1,oresults:odata,oprev:1});
      else if(req.session.mpage==0)
        res.render('home',{mresults:mdata,mnext:1,oresults:odata,oprev:1});
      else if(req.session.mpage!=0)
        res.render('home',{mresults:mdata,mprev:1,onext:1,oresults:odata,oprev:1});
    }

    else if(req.session.opage==0){
      //res.render('home',{oresults:odata,onext:1});
      if(res.mdata.length<rowc)
        res.render('home',{mresults:mdata,mprev:1,oresults:odata,onext:1});
      else if(req.session.mpage==0)
        res.render('home',{mresults:mdata,mnext:1,oresults:odata,onext:1});
      else if(req.session.mpage!=0)
        res.render('home',{mresults:mdata,mprev:1,mnext:1,oresults:odata,onext:1});
    }

    else if(req.session.opage!=0){
      //res.render('home',{oresults:odata,oprev:1,onext:1});
      if(res.mdata.length<rowc)
        res.render('home',{mresults:mdata,mprev:1,oresults:odata,oprev:1,onext:1});
      else if(req.session.mpage==0)
        res.render('home',{mresults:mdata,mnext:1,oresults:odata,oprev:1,onext:1});
      else if(req.session.mpage!=0)
        res.render('home',{mresults:mdata,mprev:1,mnext:1,oresults:odata,oprev:1,onext:1});
    }

    //res.end();
  }

}

module.exports=home;
