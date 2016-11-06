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

    function isValidPostal(email)
    {
        var postal_code = $("#postal_code").val();
        var postalRegex = new RegExp('^[a-zA-Z0-9]{1,6}$');
        if (postal_code.match(postalRegex))
        {
            console.log("Passed");
        }else
        {
            console.log("Deine Mutti");
        }
    }

    function isValidHouseNumber(email)
    {
        var house_number = $("#house_number").val();
        var house_numberRegex = new RegExp('^[0-9]{1,5}$');
        if (house_number.match(house_numberRegex))
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
    $("#postal_code").on("input", isValidPostal);
    $("#house_number").on("input", isValidHouseNumber);

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