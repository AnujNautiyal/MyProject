/*
Extract Post request data-> source stackoverflow
*/
var qs = require('querystring');

var post ={

main: function (request, response,next) {

    if (request.method == 'POST') {
        var body = '';

        request.on('data', function (data) {
            body += data;
            if (body.length > 1e6)
                request.connection.destroy();
        });

        request.on('end', function () {
             var data = qs.parse(body);
             //console.log("extractPostData "+data);
             next(data);
        });
    }
},
main2: function (request, response,next) {

    if (request.method == 'POST') {
        var body = '';

        request.on('data', function (data) {
            body += data;
            if (body.length > 1e6)
                request.connection.destroy();
        });

        request.on('end', function () {
             var data = qs.parse(body);
             response.postdata = qs.parse(body);
             console.log(data.Bid);
             next();
        });
    }
}

}
module.exports = post;
