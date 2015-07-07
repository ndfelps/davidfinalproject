var React = require('react');
var Backbone = require('backbone');
Backbone.$ = require('jquery');

module.exports = Backbone.Model.extend({
	defaults: {
		user: null,
		rating: null,
		guide: null
	},
	validate: function(attr) {
		
	}
});