var React = require('react');
var $ = require('jquery');
var ref = new Firebase("https://lolresource.firebaseio.com");
var users = new Firebase("https://lolresource.firebaseio.com/users");

module.exports = React.createClass ({
    render: function() {
        return(
        	<section>
        		<div className="login-signup">
					<form onSubmit={this.signIn}>
						<h2>Sign Up!</h2>
						<input type = "text" className = "firstName" placeholder = "First Name" /> <span className = "error firstError">*you must ender a valid name</span><br />
						<input type = "text" className = "lastName" placeholder = "Last Name" /> <span className = "error lastError">*you must ender a valid name</span><br />
						<input type = "text" className = "username" placeholder = "Username" /> <span className = "error signError">*you must ender a valid username</span><br />
						<input type = "text" className = "email" placeholder = "Email" /> <span className = "error emailError">*you must ender a valid email</span><br />
                        <input type = "text" className = "avatar" placeholder = "Avatar Link" />
						<input type = "password" className = "password" placeholder = "Password" /> <span className = "error passError">*you must ender a valid password</span><br />
						<button className = "signButton">Submit</button>
					</form>
				</div>
				<section className = 'signUpSuccess'>
					You have succesfully signed up! Click <a className = 'regLink' href = '#login'>here</a> to log in!
				</section>
        	</section>
        );
    },
    signIn: function(e) {
    	e.preventDefault();
        var firstName = $('.firstName').val();
        var lastName = $('.lastName').val();
        var email = $('.email').val();
        var password = $('.password').val();
        var username = $('.username').val();
        var avatar = $('.avatar').val();
        //Data validations
        var f = false;
        var l = false;
        var p = false;
        var u = false;
        if (firstName === "") {
            $('.firstError').show();
        } else {
            $('.firstError').hide();
            f = true;
        }
        if (lastName === "") {
            $('.lastError').show();
        } else {
            $('.lastError').hide();
            l = true;
        }
        if (password === "") {
            $('.passError').show();
        } else {
            $('.passError').hide();
            p = true;
        }
        if (username === "") {
            console.log('???');
            $('.signError').show();
            u = false;
        } else {
            $('.signError').hide();
            u = true;
        }
        var atSym = false;
        var eDotCom = false;
        if ('@' in email.split('')) {
            atSym = true;
        }
        if (atSym === false) {
            $('.emailError').show();
        } else {
            $('.emailError').hide();
            atSym = true;
        }
        if (email.substring(email.length-4) === ".com") {
            eDotCom = true;
        }
        if (eDotCom === false) {
            $('.emailError').show();
        } else {
            $('.emailError').hide();
        }
        atSym = true;
        if(atSym && eDotCom && p && f && l) {
            var newUser = {
                email: email,
                password: password,
                firstName: firstName,
                lastName: lastName,
                username: username,
                avatar: avatar
            };
            users.push(newUser);
            ref.createUser({
				  email    : email,
				  password : password,
				  firstName: firstName,
				  lastName: lastName,
				  username: username
				}, function(error, userData) {
				  if (error) {
				    console.log("Error creating user:", error);
				  } else {
				    console.log("Successfully created user account with uid:", userData.uid);
				  }
			});
            $('#container').show();
            $('.login-signup').hide();
            $('.signUpSuccess').show();
        }
    }
});