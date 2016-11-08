$(document).ready(function(){

    function isValidUsername()
    {
        var username = $("#username").val()
        var nameRegex = new RegExp(/^[A-Za-z0-9_-]{3,10}$/);
        result = false;
        if (username.match(nameRegex))
        {
            $("#usertext").text("This username is allowed.");
            result = true;
        }else
        {
            $("#usertext").text("Make sure to use the correct format.");            
        }
        return result;
    }

    function isValidPassword(password)
    {
        var password = $("#password").val();
        var passwordRegex = new RegExp(/^[\@\#\$\%\^\&\*\(\)\_\+\!\A-Za-z0-9_-]{6,18}$/);
        result = false;
        if (password.match(passwordRegex))
        {
            $("#passtext").text("This password is allowed.");   
            result = true;
        }else
        {
            $("#passtext").text("Make sure to use the correct format.");            
        }
        return result;
    }

    function isValidEmail(email)
    {
        var eMail = $("#email").val();
        var eMailRegex = new RegExp('^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+.[A-Za-z]{2,4}$');
        result = false;
        if (eMail.match(eMailRegex))
        {
            $("#emailtext").text("This email is allowed.");
            result = true;
        }else
        {
            $("#emailtext").text("Make sure to use the correct format.");            
        }
        return result;
    }

    function isValidPostal(postal_code)
    {
        var postal_code = $("#postal_code").val();
        var postalRegex = new RegExp('^[a-zA-Z0-9]{6}$');
        result = false;
        if (postal_code.match(postalRegex))
        {
            $("#postaltext").text("This postal code is allowed.");
            result = true;
        }else
        {
            $("#postaltext").text("Make sure to use the correct format.");            
        }
        return result;
    }

    function isValidHouseNumber(house_number)
    {
        var house_number = $("#house_number").val();
        var house_numberRegex = new RegExp('^[0-9]{1,5}$');
        result = false;
        if (house_number.match(house_numberRegex))
        {
            $("#numbertext").text("This house number is allowed.");
            result = true;
        }else
        {
            $("#numbertext").text("Make sure to use the correct format.");            
        }
        return result;
    }  

    $("#username").on("input", isValidUsername);           
    $("#password").on("input", isValidPassword);
    $("#email").on("input", isValidEmail);
    $("#postal_code").on("input", isValidPostal);
    $("#house_number").on("input", isValidHouseNumber);
    
    
    if (window.document.cookie){
        $('#NavbarAtTop').append('<li><a href= "http://localhost:5000/logout" id="LogoutNavbar">Log Out</a></li>');
    }
    else{
        $('#NavbarAtTop').append('<li><a href="/login" id="LoginNavbar">Login</a></li>');
    }


    $('button').click(function(e){
        // var name = $('#username').val();
        // var pass = $('#password').val();
        // var email = $('#email').val();
        var emailcheck = isValidEmail(); var usernamecheck = isValidUsername(); var passwordcheck = isValidPassword(); var postalcheck = isValidPostal(); var numbercheck = isValidHouseNumber();
        if (emailcheck && usernamecheck && passwordcheck && postalcheck && numbercheck){
            $("#submittext").text("Your account has been created!");
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
            window.location.href = "/login";
        }else
        {
            $("#submittext").text("Make sure to fill in all fields correctly.");
        }
        

    });
    return false;
});