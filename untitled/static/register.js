$(document).ready(function(){

    function isValidUsername()
    {
        var username = $("#username").val()
        var nameRegex = new RegExp(/^[A-Za-z0-9_-]{3,10}$/);
        if (username.match(nameRegex))
        {
            console.log("Passed");
        }else
        {
            console.log("Deine Mutti");
        }
    }

    function isValidPassword(password)
    {
        var password = $("#password").val();
        var passwordRegex = new RegExp(/^[\@\#\$\%\^\&\*\(\)\_\+\!\A-Za-z0-9_-]{6,18}$/);
        if (password.match(passwordRegex))
        {
            console.log("Passed");
        }else
        {
            console.log("Deine Mutti");
        }
    }

    function isValidEmail(email)
    {
        var eMail = $("#email").val();
        var eMailRegex = new RegExp('^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+.[A-Za-z]{2,4}$');
        if (eMail.match(eMailRegex))
        {
            console.log("Passed");
        }else
        {
            console.log("Deine Mutti");
        }
    }

    $("#username").on("input", isValidUsername);
    $("#password").on("input", isValidPassword);
    $("#email").on("input", isValidEmail);

    $('button').click(function(e){
        // var name = $('#username').val();
        // var pass = $('#password').val();
        // var email = $('#email').val();
        $.ajax({
            url : "http://localhost:5000/register",
            data: $('form').serialize(),
            type : 'POST',
            success: function(response) {
                console.log(response);
                // Reponse is True --> show succes message
                // Response is False --> show fail message 
            }
        });
    });
    return false;
});