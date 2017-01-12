$(document).ready(function()
{
    var username;
    var password;
    
    function checkUserName()
    {
        username = $("#username").val();
        // $.ajax(function() 
        // {
        //     url: ""
        // });
        console.log(username);
    }

    function checkPassword()
    {
        password = $("#password").val();
        console.log(password);
    }

    $("#username").on("input", checkUserName);
    $("#password").on("input", checkPassword);

    $("button").click(function(e)
    {
        
        $.ajax({
            xhrFields : {
                withCredentials: true
            },
            url : "http://localhost:5000/login",
            data: $('form').serialize(),
            type : 'POST',
            success: function(response) {
            window.location.href = "/";
            console.log(response);
            }

        });
    });

    function logOut()
    {
        $.ajax(
            {
                url : "http://localhost:5000/logout"
            }
        )
    }

    $("logOutButton").click(logOut);

    if (window.document.cookie){
        $('#NavbarAtTop').append('<li><a href= "http://localhost:5000/logout" id="LogoutNavbar">Log Out</a></li>');
    }
    else{
        $('#NavbarAtTop').append('<li><a href="/login" id="LoginNavbar">Login</a></li>');
        $('#NavbarAtTop').append('<li><a id="registershit" href="/register">Register</a></li>');
    }
});