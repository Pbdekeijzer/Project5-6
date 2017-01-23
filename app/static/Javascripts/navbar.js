$(document).ready(function()
{
    if (window.document.cookie){
        var Thecookiedivided = window.document.cookie.toString().split('=');    //Puts the data in an array, data is divided by the = mark
        username = Thecookiedivided[1].slice(1);                                //Slice because first element is a "
        adminbool = parseInt(Thecookiedivided[2]);                              //The adminbool is an integer, with 0 or 1 as the bool value

        account_url = "/account/"  + username;
        wishlist_url = "/wishlist/" + username; 
        $("#UserLoggedInNotification").text("Logged in as: " + username);
        if (adminbool == 1){ 													//notify user he is an admin
				$("#UserLoggedInNotification").append(" <br> You are an admin!"  );
				$('#NavbarAtTop').append('<li><a href= "/adminpage" id="AdminNavbar">Admin</a></li>');
			}
		$('#NavbarAtTop').append('<li><a href='+ wishlist_url +'>Wishlist</a></li>');
        $('#NavbarAtTop').append('<li><a href="/favourites">Favourites</a></li>');
        $('#NavbarAtTop').append('<li id="account_url"><a href= ' + account_url +  ' id="Account">' + username + '</a></li>');
        $('#NavbarAtTop').append('<li><a href= "/logout" id="LogoutNavbar">Log Out</a></li>');
        $('#LogoutNavbar').click(function(){
            localStorage.clear();
        });
    }
    else{
        $("#UserLoggedInNotification").text("You are not logged in");
        $('#NavbarAtTop').append('<li><a href="/login" id="LoginNavbar">Login</a></li>');
        $('#NavbarAtTop').append('<li><a id="registershit" href="/register">Register</a></li>');			
    }
});
