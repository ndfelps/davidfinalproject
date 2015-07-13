var React = require('react');
var ref = new Firebase("https://lolresource.firebaseio.com");
var Login = require('./loginPage');
var $ = require('jquery');

module.exports = React.createClass ({
    render: function() {
        return(
        	<a onClick={this.logOut} className = "topNav logout">Log Out</a>
        );
    },
    logOut: function(e) {
        ref.unauth();
        window.location.hash = 'login';
        $('.loginLink').show();
        $('.logout').hide();
    }
});