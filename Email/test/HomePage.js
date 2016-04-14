/*
Home Page of logged in user having only logout button
*/
var HomePage =
{
main: function(req,res,cb){
  var data ='';
  if(req.session.umsg !=undefined){
    data = req.session.umsg;
    req.session.umsg = undefined;
  }
  res.render('HomePage',{message:data});
}

};

module.exports = HomePage;
