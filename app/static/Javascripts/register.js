$(document).ready(function(){

    var conpasstest;

    function isValidUsername(border)
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
            if (border == true){
                $('#usertext').css('color', 'red');
            }    
            else{
                $('#usertext').css('color', 'black');
            }                         
        }
        return result;
    }

    function isValidPassword(border)
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
            if (border == true){
                $('#passtext').css('color', 'red');
            }    
            else{
                $('#passtext').css('color', 'black');
            }                         
        }
        return result;
    }

    function isValidConfirmPassword(border)
    {
        var password = $("#confirmpassword").val();
        var passwordRegex = new RegExp(/^[\@\#\$\%\^\&\*\(\)\_\+\!\A-Za-z0-9_-]{6,18}$/);
        result = false;
        if (password.match(passwordRegex))
        {
            $("#confirmpasstext").text("This password is allowed."); 
            $('#confirmpasstext').css('color', 'black');  
            result = true;
        }else
        {
            $("#confirmpasstext").text("Make sure to use the correct format."); 
            if (border == true){
                $('#confirmpasstext').css('color', 'red');
            }    
            else{
                $('#confirmpasstext').css('color', 'black');
            }                         
        }
        return result;
    }

    function isValidEmail(border)
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
            if (border == true){
                $('#emailtext').css('color', 'red');
            }    
            else{
                $('#emailtext').css('color', 'black');
            }                         
        }
        return result;
    }

    function isValidPostal(border)
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
            if (border == true){
                $('#postaltext').css('color', 'red');
            }    
            else{
                $('#postaltext').css('color', 'black');
            }            
        }
        return result;
    }

    function isValidHouseNumber(border)
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
            if (border == true){
                $('#numbertext').css('color', 'red');
            }     
            else{
                $('#numbertext').css('color', 'black');
            }     
        }
        return result;
    }  

    $("#username").on("input", isValidUsername);           
    $("#password").on("input", isValidPassword);
    $("#email").on("input", isValidEmail);
    $("#postal_code").on("input", isValidPostal);
    $("#house_number").on("input", isValidHouseNumber);
    $("#confirmpassword").on("input", isValidConfirmPassword);
    
    

    function passwordCheck(){
        var pass = $("#password").val();
        var confirmpass = $("#confirmpassword").val();
        result = false;
        if (pass == confirmpass){
            result = true;
            $('#confirmpasstext').css('color', 'black');
            $('#passtext').css('color', 'black');
        }
        else{
            $("#confirmpasstext").text("The passwords don't match.");
            $('#confirmpasstext').css('color', 'red');

        }

        return result;
    }

    function registerButton(){      
        var succes = false;
        var emailcheck = isValidEmail(true); var usernamecheck = isValidUsername(true); var passwordcheck = isValidPassword(true); var postalcheck = isValidPostal(true); var numbercheck = isValidHouseNumber(true); var confirmpasswordcheck = isValidConfirmPassword(true); 
        result = passwordCheck(); 
        if (emailcheck && usernamecheck && passwordcheck && postalcheck && numbercheck && confirmpasswordcheck && result){
            succes = true;
        }
        return succes;
    }

    $('button').click(function(e){
        var succes = registerButton();

        if (succes){
            $.ajax({
                url : "/register",
                data: $('form').serialize(),
                type : 'POST',
            }).done(function(result)
            {
                console.log(result);
                if (result == "Succes"){
                $("#submittext").text("Your account has been created!");
                    window.location.href = "/login";        
                }
                else{
                    $("#usertext").text("Username is already taken.")
                }
            });

        }else
        {
            $("#submittext").text("Make sure to fill in all fields correctly.");
        }
        

    });
    return false;
});