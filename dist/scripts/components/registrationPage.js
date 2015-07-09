var React = require('react');

module.exports = React.createClass ({
    render: function() {
        return(
        	<section>
        		<div className="login-signup">
					<form>
						<h2>Or Sign Up!</h2>
						<input type = "text" className = "firstName" placeholder = "First Name" /> <span className = "error firstError">*you must ender a valid name</span><br />
						<input type = "text" className = "lastName" placeholder = "Last Name" /> <span className = "error lastError">*you must ender a valid name</span><br />
						<input type = "text" className = "username" placeholder = "Username" /> <span className = "error signError">*you must ender a valid username</span><br />
						<input type = "text" className = "email" placeholder = "Email" /> <span className = "error emailError">*you must ender a valid email</span><br />
						<input type = "password" className = "password" placeholder = "Password" /> <span className = "error passError">*you must ender a valid password</span><br />
						<button className = "signButton">Submit</button>
					</form>
				</div>
				<section className = 'signUpSuccess'>
					You have succesfully signed up! Click <a className = 'regLink' href = '#login'>here</a> to log in!
				</section>
        	</section>
        );
    }
});