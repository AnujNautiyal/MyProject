/*
Cache implemented but not working properly
*/
var obcache = require('obcache');

// var cache;
var wrapper;

var MyCache={
initialize: function(){
  cache = obcache.debug.register(new obcache.Create({
          max: 3000,
          maxAge: 60 * 60 * 2,
          queueEnabled: true,
          /*redis: {
          host: redisConfig.host,
          port: redisConfig.port
          },*/
          id: 1
        }), 'Cache');
  console.log("Cache initialized");
},

getcache: function(){
//  var wrapper = cache.wrap(test);
//  wrapper();
return cache;
},
test: function(){

}
}
module.exports = MyCache;
