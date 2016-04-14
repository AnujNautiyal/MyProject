/*
Display create Blog page
*/
var post={
main : function(req,res)
{
  console.log("blogTemplate");
  res.render('blogTemplate');
}

}
module.exports = post;
