$(document).ready(function(){

    function isValidUsername()
    {
        var username = $("#username").val()
        var nameRegex = new RegExp(/^[A-Za-z0-9_-]{3,10}$/);
        if (username.match(nameRegex))
        {
            isUsernameTaken(username);
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
            isEmailTaken(eMail);
            console.log("Passed");
        }else
        {
            console.log("Deine Mutti");
        }
    }

    function isUsernameTaken(username)
    {
        $.ajax({
            url: "127.0.0.1:5000/accounts?name=" + username
        }).done(function(json){
            console.log(json);
        });
    }

    function isEmailTaken(email)
    {
        return false;
    }

    $("#username").on("input", isValidUsername);
    $("#password").on("input", isValidPassword);
    $("#email").on("input", isValidEmail);

});