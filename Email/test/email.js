/*
Used to send mail
*/
var nodemailer = require("nodemailer");
var smtpTransport = nodemailer.createTransport("SMTP",{
    service: "Gmail",
    auth: {
        user: "anuj.nautiyal@paytm.com",
        pass: "*********"
    }
});

var email = {

main:function(options) {
  /*var mailOptions={
          to : email,
          subject : "Click to Register",
          text : "Below Link will expire in 5 min"
      }*/
      //console.log(options);

      smtpTransport.sendMail(options, function(error, response){
       if(error){
              console.log("Email error");
       }else{
              //console.log("Message sent: " + response.message);
              console.log("Email sent");
           }
  });
}
}/*login*/

module.exports = email;
