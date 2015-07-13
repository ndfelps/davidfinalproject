var React = require('react');
var Backbone = require('backbone');
Backbone.$ = require('jquery');

module.exports = Backbone.Model.extend({
	defaults: {
		user: null,
		text: null,
		score: null,
		comments: null,
		champion: null
	},
	validate: function(attr) {
		
	}
});