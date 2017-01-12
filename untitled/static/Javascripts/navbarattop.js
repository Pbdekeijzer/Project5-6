$(document).ready(function(){

		//reads cookie and shows if user is logged in or not
		if (window.document.cookie){
			var Howdoesmycookielook = window.document.cookie.toString(); 			//you can put a breakpoint in the browser at this line, so you can check what the cookie contains
			var Thecookiedivided = window.document.cookie.toString().split('=');	//Puts the data in an array, data is divided by the = mark
			username = Thecookiedivided[1].slice(1); 								//Slice because first element is a "
			$("#UserLoggedInNotification").text("Logged in as: " + username);
			adminbool = parseInt(Thecookiedivided[2]);								//The adminbool is an integer, with 0 or 1 as the bool value
			
			if (adminbool == 1){ 													//notify user he is an admin
				$("#UserLoggedInNotification").append(" <br> You are an admin!"  );
				$('#NavbarAtTop').append('<li><a href= "/adminpage" id="AdminNavbar">AdminFeatures</a></li>');
				//TODO: append an admin link in the navbar
			}


			$('#NavbarAtTop').append('<li><a href= "/logout" id="LogoutNavbar">Log Out</a></li>');
		}
		else{
			$("#UserLoggedInNotification").text("You are not logged in");
			$('#NavbarAtTop').append('<li><a href="/login" id="LoginNavbar">Login</a></li>');
    	    $('#NavbarAtTop').append('<li><a id="registershit" href="/register">Register</a></li>');			
		}
});