var mysql  = require('mysql');
var connection;

/*Public*/
var db = {

connect: function(cb){
  connection= mysql.createConnection({
      host     : 'localhost',
      user     : 'root',
      password : 'paytm@197',
      database : 'Blog'
  });
  if(connection==undefined){
    connection.connect( function(err, result) {
      if (err) {
        console.log("DB_error")
        cb(0);
      }
      else {
        console.log('DB_connected as id ' + connection.threadId);
        cb(1);
      }
    });
  }
  else {
    console.log('Connection already exists');
    cb(1);
  }
},


insert: function(table,arguments,cb){
  var query = connection.query('INSERT INTO '+ table +' SET ?', arguments, function(err, result) {
    //  console.log(result);
    if (!err){
      console.log("DB Insert");
      cb(1);
    }
    else {
      console.log("DB_error");
      cb(2);
    }
  });
  console.log(query.sql);
},

select_all: function(table,cb) {
    var query=connection.query('SELECT * FROM '+ table, function(err, result) {
    //  console.log(result);
      if (!err){
        cb(1,result);
      }
      else {
        cb(0);
      }
  });
  console.log(query.sql);
},/*select*/

select_ar: function(table,col,value,cb) {
    var query=connection.query('SELECT * FROM '+ table+" WHERE "+col +" = " + value, function(err, result) {
      //console.log(result);
      if (!err){
        cb(1,result);
      }
      else {
        cb(0);
      }
  });
  console.log(query.sql);
}/*select*/,


select_range: function(table,start,end,cb) {
    var query=connection.query('SELECT * FROM '+ table + ' limit '+start+","+ end, function(err, result) {
    //  console.log(result);
      if (!err){
        cb(1,result);
      }
      else {
        cb(0);
      }
  });
  console.log(query.sql);
}/*select*/,

update: function(table,argument,value,key,kvalue,cb){
  var query = connection.query('UPDATE '+ table + ' SET ' + argument + '=' + value + ' WHERE ' +key + ' = ?', kvalue,function(err, result){
    //  console.log(result);
    if (!err){
      //console.log("DB Updated");
      cb(1);
    }
    else {
      console.log("DB_error");
      cb(2);
    }
  });/*query*/
  console.log(query.sql);
},

delete: function(table,argument,value,cb){
  var query = connection.query('DELETE FROM '+ table + ' WHERE ' +argument + ' = ?', value,function(err, result){
    //  console.log(result);
    if (!err){
      //console.log("DB Updated");
      cb(1);
    }
    else {
      console.log("DB_error");
      cb(2);
    }
  });/*query*/
  console.log(query.sql);
},
custom: function(custom,cb){
  var query = connection.query(custom,function(err, result){
      //console.log(result);
    if (!err){
    //  console.log("DB Updated");
      cb(1,result);
    }
    else {
      console.log("DB_error");
      cb(2);
    }
  });/*query*/
  console.log(query.sql);
}

} /*db */


module.exports = db;
