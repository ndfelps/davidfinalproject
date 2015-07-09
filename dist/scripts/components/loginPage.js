var React = require('react');

module.exports = React.createClass ({
    render: function() {
        return(
        	<section className="main">
        		<section className = 'loginCon'>
					<div className="login-tron page">
						<div className="logo">
							<h1>Welcome!</h1>
						</div>
					</div>
					<div className="login-input page">
						<form>
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
    }
});