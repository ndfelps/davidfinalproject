var React = require('react');
var guides = new Firebase("https://lolresource.firebaseio.com/guides");

module.exports = React.createClass ({
    render: function() {
        return(
        	<section>
        		<form onSubmit = {this.returnGuides} className = 'searchForm'>
        			<input type = 'text' className = 'searchText' />
        			<button>Submit</button>
        		</form>
        	</section>
        );
    },
    returnGuides: function() {

    }

});

function searchGuides() {
    var results = [];
	var searchVal = $('.searchText').val();
	searchVal = searchVal.split(' ');
	for(var i = 0; i<searchVal.length(); i++) {
		guides.on("value", function(snapshot) {
	        guideCount = snapshot.val();
	        console.log(snapshot.val());
	    }, function (errorObject) {
	        console.log("The read failed: " + errorObject.code);
	    });
	    for(var key in guideCount) {
	    	if (searchVal[i] === searchGuide[key].name || searchVal[i] === searchGuide[key].name) {
	    		var count = 'guide' + i;
	    		results.append(searchGuide[key]);
	    	}
	    }
	}
	return results;
}
