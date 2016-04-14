/*
Used for ciphering password , source:- random wibsite
*/
var crypto = require('crypto');

var crypt={

  cipher: function(text){
    var algorithm = 'aes-256-ctr';
    var password = 'd6F3Efeq';
    var cipher = crypto.createCipher(algorithm,password);
    var crypted = cipher.update(text,'utf8','hex')
    crypted += cipher.final('hex');
    return crypted;
  }
}

module.exports=crypt;
