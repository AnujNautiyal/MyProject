var logout ={
  main:function(req,res){
    /*session start*/
    req.session.open =undefined;
    /*myArticle default setting*/
    req.session.mpage =undefined;
    req.session.morder =undefined;
    /*otherArticle default setting*/
    req.session.opage =undefined;
    req.session.oorder =undefined;
    /*storing my id in session */
    req.session.email = undefined;
    res.redirect('/');
  }
}

module.exports = logout;
