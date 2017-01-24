$(document).ready(function()
{
    $('#NotFoundAlert').hide();
    var username;
    var password;

    function ShowAlert(text, color){
        $('#NotFoundAlert').empty();
        $('#NotFoundAlert').text(text);
        $('#NotFoundAlert').css('background-color', color);
        $('#NotFoundAlert').show();
        $('#NotFoundAlert').delay(3500).hide(1200);
    }

    
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
                if (response == "Your account is blocked, access denied")
                    ShowAlert(response, "lightcoral");
                else if (response == "401")
                    ShowAlert("Username, Password combination is not correct", "lightcoral");
                else
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