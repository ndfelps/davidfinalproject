var React = require('react');
var guides = new Firebase("https://lolresource.firebaseio.com/guides");
var $ = require('jquery');

module.exports = React.createClass ({
    render: function() {
        return(
        	<section>
        		<form onSubmit = {this.returnGuides} className = 'searchForm'>
        			<input type = 'text' className = 'searchText' />
        			<button>Submit</button>
        		</form>
        		<div className = 'searchResults'>
        		</div>
        	</section>
        );
    },
    returnGuides: function() {
    	var Val = '';
		var guideCount;
		var result = [];
		var searchVal = $('.searchText').val();
		$('.searchResults').html('');
		searchVal = searchVal.split(' ');
		for(var i = 0; i<searchVal.length; i++) {
			var searched = searchVal[i];
			guides.on("value", function(snapshot) {
	        guideCount = snapshot.val();
	        for(var key in guideCount) {
	        	console.log(guideCount[key].champion);
	        	console.log(guideCount[key].role);
		    	if (searched === guideCount[key].champion || searched === guideCount[key].role) {
		    		console.log(guideCount[key]);
		    		result.push(guideCount[key]);
		    		console.log(result);
		    	}
	    	}
	    	if(result.length === 0) {
    			Val = "No results were found"
	    	} else {
				for (var i = 0; i<result.length; i++) {
					$('.searchResults').append("<div className = 'searchChamp'>" + result[i].champion + "</div><div className = 'searchRole'>" + result[i].role + "<div className = 'searchTitle>" + result[i].title + "</div><div className = 'searchRating'>" + result[i] + "</div>");
									}
			}
			
	    }, function (errorObject) {
	        console.log("The read failed: " + errorObject.code);
	    });
	    
	    
	}
    	
    	
    }
});
