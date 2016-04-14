var express  = require('express');
var root     = require('./Files/root');
var blogt    = require('./Files/blogTemplate');
var save     = require('./Files/saveBlog');
var blog     = require('./Files/blog');
var qs       = require('./Files/extractPostData');
var comment  = require('./Files/comment');
var show     = require('./Files/show');
var register = require('./Files/registerUser');
var login    = require('./Files/loginUser');
var logout   = require('./Files/logoutUser')
var cache    = require('./Files/cache');
var home     = require('./Files/home');

var app      = express();
app.set('view engine', 'jade');

cache.initialize();
/*middle ware*/
app.use(express.cookieParser());
app.use(express.session({secret: '1234567890QWERTY'}));

/*Home Page*/
app.get('/',root.main);

app.get('/show',show.main,show.display);

/*register*/
app.post('/registerUser',register.main);
/*login*/
app.post('/loginUser',login.main);
app.get('/logoutUser',logout.main);
app.get('/home',home.main,home.display);

/*Article write*/
app.get('/blogTemplate',blogt.main);

/*Save article*/
app.post('/saveBlog',function(req,res){
  save.main(req,res);
});

/*Display Blog*/
app.get('/blog',blog.main,blog.display);

/*New Comment*/
app.post('/comment',qs.main2,comment.create);

/*Comment updated*/
app.get('/comment',comment.update);

/*Port listen*/
app.listen(3001, function () {
  console.log('Example app listening on port 3001!');
});
