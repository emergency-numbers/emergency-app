
/**
 * Module dependencies.
 */

var createView = require('view');
var List = require('view-emergency-numbers');
var country = require('emergency-numbers');
var request = require('superagent');
var View = createView(require('./template.html'));

/**
 * Expose `NumbersView`.
 */

module.exports = NumbersView;

/**
 * Numbers view.
 *
 * The main view of the application with a heading and a list.
 */

function NumbersView(){
  this.list = new List;
  this.view = new View;
  this.el = this.view.el;
  this.el.appendChild(this.list.el);
  var self = this;

  navigator.geolocation.getCurrentPosition(function(pos){
    var coords = pos.coords;
    request
    .get('http://maps.googleapis.com/maps/api/geocode/json')
    .query({latlng: coords.latitude + ',' + coords.longitude})
    .query({sensor: false})
    .query({language: 'en'})
    .end(function(res){
      var node = res.body.results.pop();
      self.addList(node);
    });
  });
}

NumbersView.prototype.addList = function(node){
  var self = this;
  var info = country(node.formatted_address);
  var main = this.el.querySelector('main');
  Object.keys(info.numbers).forEach(function(service){
    self.list.add({ service: service, number: info.numbers[service] });
  });
};

