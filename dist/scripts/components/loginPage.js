var React = require('react');
var $ = require('jquery');
var ref = new Firebase("https://lolresource.firebaseio.com");
var Logout = require('./logout');
var authData = ref.getAuth();

function logArea() {
		if(authData === null) {
			$('.loginLink').show();
		    $('#logOut').hide();
			
		} else {
			$('.loginLink').hide();
		    $('#logOut').show();
			 React.render(<Logout/>, document.querySelector('#logOut'));
		}
	}

module.exports = React.createClass ({
    render: function() {
        return(
        	<section className="main">
        		<section className = 'loginCon'>
					<div className="login-tron page">
						<div>
							<h1>Welcome!</h1>
						</div>
					</div>
					<div className="login-input page">
						<form onSubmit={this.logIn}>
							<h2>Log in here...</h2>
							<input type = "text" className = "userBox" placeholder = "Username" /> <span className = "error userError">*Your username or password is incorrect</span>
							<input type = "password" className = "passBox" placeholder = "Password" />
							<button type = "submit" className = "logButton">Submit</button>
						</form>
						Or sign up <a className = 'regLink' href = '#registration'>here</a>!
					</div>
				</section>
			</section>
        );
    },
    logIn: function(e) {
    	e.preventDefault();
    	console.log('??');
    	var username = $('.userBox').val();
    	var password = $('.passBox').val();
    	if(username === "" && password === "") {

	    } else {
	        ref.authWithPassword({
				  email    : username,
				  password : password
				}, function(error, authData) {
				  if (error) {
				    console.log("Login Failed!", error);
				  } else {
				  	remember: "sessionOnly";
				    console.log("Authenticated successfully with payload:", authData);
				    logArea()
				    window.location.hash = 'home';
				    
				  }
			}); 
	    }
    }
});
    