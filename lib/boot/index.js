
/**
 * Module dependencies.
 */

var createView = require('view');
var country = require('emergency-numbers');
var List = require('view-emergency-numbers');
var template = require('./template');
var View = createView(template);
var request = require('superagent');
var list = new List;

/**
 * DOM Cache.
 */

var body = document.body;

/**
 * Discover position.
 */

navigator.geolocation.getCurrentPosition(function(pos){
  var coords = pos.coords;
  request
  .get('http://maps.googleapis.com/maps/api/geocode/json')
  .query({latlng: coords.latitude + ',' + coords.longitude})
  .query({sensor: false})
  .query({language: 'en'})
  .end(positionInfo);
});

function positionInfo(res){
  if (!res.ok || !res.body) {
    return console.error(res.error);
  }
  var node = res.body.results.pop();
  var info = country(node.formatted_address);

  // Layout

  var view = new View({ country: info.name });
  body.appendChild(view.el);

  // List of numbers

  var main = body.querySelector('main');
  Object.keys(info.numbers).forEach(function(service){
    list.add({
      service: service,
      number: info.numbers[service]
    });
  });
  main.appendChild(list.el);
}

