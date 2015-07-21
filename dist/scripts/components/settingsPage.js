var React = require('react');
var ref = new Firebase("https://lolresource.firebaseio.com");
var $ = require('jquery');
var authData = ref.getAuth();
var users = new Firebase("https://lolresource.firebaseio.com/users");

if (authData === null) {

} else {
	var email = authData["password"].email;
}
var username;
var firstName;
var lastName;


users.on("value", function(snapshot) {
	var usersList = snapshot.val();
	for (var key in usersList) {
		if (email == usersList[key].email) {
			username = usersList[key].username;
			firstName = usersList[key].firstName;
			lastName = usersList[key].lastName;
			break;
		}
	}
}, function(errorObject) {
	console.log("The read failed: " + errorObject.code);
});

module.exports = React.createClass ({
    render: function() {
    	if (authData === null) {
    		return(
    			<div>
    				Click <a className = 'regLink' href = '#login'>here</a> to log in!
    			</div>
    		)
    	} else {
	        return(
	        	<section>
	        		<div className = 'currentInfo'>
	        			Username: <div dangerouslySetInnerHTML={{__html: username}}></div><br />
	        			Email: <div dangerouslySetInnerHTML={{__html: email}}></div><br />
	        			First Name: <div dangerouslySetInnerHTML={{__html: firstName}}></div><br />
	        			Last Name: <div dangerouslySetInnerHTML={{__html: lastName}}></div><br />
	        			Password: ******** <br />
	        		</div>
	        		<form className = 'infoChange' onSubmit = {this.doTheThing}>
	        			<input type = 'text' className = 'usernameChange' placeholder = 'New Username' /><br />
	        			<input type = 'text' className = 'emailChange' placeholder = 'New Email'/><br />
	        			<input type = 'text' className = 'passwordChange' placeholder = 'New Password'/><br />
	        			<input type = 'text' className = 'passwordConfirm' placeholder = 'Confirm Password'/><br />
	        			<button className = 'makeChanges'>Submit</button>
	        		</form>
	        	</section>
	        );
		}
    },
    doTheThing: function(e) {

    }
});