var React = require('react');
var Backbone = require('backbone');
Backbone.$ = require('jquery');

module.exports = Backbone.Model.extend({
	defaults: {
		name: null,
		password: null,
		email: null,
		guides: null,
		comments: null,
		scores: null
	},
	validate: function(attr) {
		
	}
});