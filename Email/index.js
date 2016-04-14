var express  = require('express');
var login    = require('./test/login');
var register = require('./test/register');
var logout   = require('./test/logout');
var Cache    = require('./test/Cache');
var forgot    = require('./test/forgot');
var fCache    = require('./test/fCache');
var fpswd    = require('./test/fpswd');
var HomePage    = require('./test/HomePage');


var app      = express();


app.set('view engine', 'jade');

/*middle ware*/
app.use(express.cookieParser());
app.use(express.session({secret: '1234567890QWERTY'}));
/*My middle ware*/
app.use('/link',Cache.main);

app.get('/flink',function(req,res,next){
     fCache.main(req,res);
 });
/*
app.use(function(req,res,next){
  console.log("Use="+req.session.open);
  next();
});*/

/*First Page*/
app.get('/',function(req,res){
  console.log("/ callback");
  var data ='Welcome to First Page';
  if(req.session.hmsg !=undefined){
    data = req.session.hmsg;
    req.session.hmsg = undefined;
  }
  console.log(data);
  if(req.session.open==0 || req.session.open==undefined){ /*for the first time*/
    req.session.open=0;
    res.render('index',{title:'Express', Res:data});
  }
  else {
    res.redirect('/HomePage');
  }
});

/*Login logic*/
app.get('/login', function(req, res, next) {
  console.log("login callback");
  if(req.session.open ==0){
    login.main(req,res);
  }
  else {
    res.redirect('/HomePage');
  }
});

/*Logout*/
app.get('/logout', function(req, res, next) {
  console.log("logout callback");
  if(req.session.open ==1){ /*If session open */
    logout.main(req,res);
  }
  else{
    res.redirect('/');
  }

});

/*HomePage*/
app.get('/HomePage', function(req, res, next) {
  console.log("HomePage callback");
  if(req.session.open==1){
    HomePage.main(req,res);
  }
  else {
    res.redirect('/');
  }
});

/*Register Page*/
app.get('/register', function(req, res, next) {
  console.log("register callback");
  if(req.session.open==1){
    res.redirect('/HomePage');
  }
  else {
    register.main(req,res);
  }
});


/*Forgot Password Mail*/
app.get('/forgot', function(req, res, next) {
  console.log("forgot callback");
  if(req.session.open==1){
    req.session.umsg = 'Please Logout and try again';
    res.redirect('/HomePage');
  }
  else {
  forgot.main(req,res);
  }
});



/*Will update Password*/
app.get('/fpswd', function(req, res, next) {
  console.log("Fpswd callback");
  if(req.session.open==1){
    req.session.umsg = 'Please Logout and try again';
    res.redirect('/HomePage');
  }
  else {
  fpswd.main(req,res);
  }
});

/*Port listen*/
app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});

//console.log(app.stack); Middleware
