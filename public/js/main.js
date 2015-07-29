var API_GPIO = "/api/gpio/";


$(document).ready(function() {
	initBoard();

	
	// $('#GP44').click(function() {
	// 	console.log("You clicked!");
	// 	$.ajax({
	// 		url: '/api/gpio/44', 
	// 		type: 'POST',
	// 		success: function(result) {
	// 			console.log(result);
	// 		} 
	// 	});
	// });
});

function initBoard() {
	var setupBoard = function(result) {
		console.log(result);
	};

//Get list of current GPIO states
	$.ajax({
		url: API_GPIO, 
		type: 'GET',
		success: setupBoard
	});
}