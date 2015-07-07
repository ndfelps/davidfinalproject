var React = require('react');
var Backbone = require('backbone');
Backbone.$ = require('jquery');

module.exports = Backbone.Model.extend({
	defaults: {
		user: null,
		text: null,
		location: null
	},
	validate: function(attr) {
		
	}
});