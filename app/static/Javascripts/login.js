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
            url : "/login",
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
                url : "/logout"
            }
        )
    }

    $("logOutButton").click(logOut);


});