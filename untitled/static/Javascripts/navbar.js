$(document).ready(function()
{
    if (window.document.cookie){
        var username = window.document.cookie.toString().split('=');
        account_url = "http://localhost:5000/account/"  + username[1];
        $("#UserLoggedInNotification").text("Logged in as: " + username[1]);
        $('#NavbarAtTop').append('<li><a href= ' + account_url +  ' id="Account">' + username[1] + '</a></li>');
        $('#NavbarAtTop').append('<li><a href= "http://localhost:5000/logout" id="LogoutNavbar">Log Out</a></li>');
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