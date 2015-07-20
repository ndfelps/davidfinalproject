var React = require('react');

module.exports = React.createClass ({
    render: function() {
        return(
        	<section>
        		<div>
        			<h2 className = 'homeTitles'>News & Updates</h2>
                    <div className = 'news'>
                        Welcome to LoLResource! We are the premier website dedicated to helping to get new players introduced to the most popular competitive game on the planet, League of Legends! Our guides are engineered towards helping new players who are just diving into the game for the first time. We're not here to help dig you out of ELO hell, or put you at the top of the ladder, but just to help you understand more about the game as you progress through the early levels. We'll let you know what you need to do with influence points, and when you need to start investing in runes and focusing on masteries! Look for general user guides in an upcoming content update that will have more information.
                    </div>
        		</div>
        		<div>
        			<h2 className = 'homeTitles'>Featured Guides</h2>
        		</div>

        	</section>
        );
    }
});