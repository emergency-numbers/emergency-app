
/**
 * Module dependencies.
 */

var favicon = require('koa-favicon');
var logger = require('koa-logger');
var route = require('koa-route');
var send = require('koa-send');
var serve = require('koa-static');
var koa = require('koa');
var app = module.exports = koa();

/**
 * Middle-ware.
 */

app.use(logger());
app.use(favicon());
app.use(serve('./public'));

/**
 * Routes.
 */

app.use(function *() {
  yield send(this, __dirname + '/index.html');
});

/**
 * Start listening.
 */

if (!module.parent) {
  app.listen(3000);
  console.log('Listening on port 3000');
}

