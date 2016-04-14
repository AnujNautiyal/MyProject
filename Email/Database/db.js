var mysql  = require('mysql');
/*Private */
var connection;

/*Public*/
var db = {

connect: function(cb){

  connection= mysql.createConnection({
      host     : 'localhost',
      user     : 'root',
      password : 'paytm@197',
      database : 'TEST'
  });

  connection.connect( function(err) {
    if (err) {
      console.log("DB_error")
      //console.error('error connecting: ' + err.stack);
      cb(0)
      return;
    }else {
    console.log("DB_",'connected as id ' + connection.threadId);
    cb(2);
    }

  });

},

select: function(email,pswd,cb) {
  console.log("select");
    connection.query('select * from Persons where Email = ?', email, function(err, rows,result) {
  if (!err){
    if(rows.length==1 ){
      if(pswd == rows[0].Password) {
        var name= rows[0].Name;
        console.log(rows[0].Password);
        cb(1,name);/*Found */
      }
      else{
        cb(2);/*Wrong Password*/
      }
    }
    else{
      cb(3);/*No user found */
    }
  }
  else {
   cb(4);//console.log('Error while performing Query.');
  }
  });

},/*select*/

insert: function(email,pswd,name,cb){
  var post  = {Email: email, Password: pswd, Name:name, activated:false};
//var query =
connection.query('INSERT INTO Persons SET ?', post, function(err, result) {
  if (!err){
    console.log("DB Insert");
    cb(1);
  }
  else {
    console.log("DB_error");
    cb(2);
  }
});
//console.log(query);
},

update: function(email,pswd,cb){
  console.log("update"+email+pswd);
  connection.query('UPDATE Persons SET Password = ? WHERE Email = ?', [pswd,email],function(err,result){
    if (!err){
      console.log("DB Updated");
      cb(1);
    }
    else {
      console.log("DB_error");
      cb(2);
    }
  });/*query*/
}

}; /*db */


module.exports = db;
