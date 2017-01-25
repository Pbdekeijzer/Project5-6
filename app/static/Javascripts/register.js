$(document).ready(function(){

    var conpasstest;

    function isValidUsername(border) //Check username
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

    function isValidPassword(border) //Check password
    {
        var password = $("#password").val();
        var passwordStrength = 0;
        var regexs = [/.{6,18}/, /[a-z]+/, /[0-9]+/, /[A-Z]+/];
        result = false;
        jQuery.map(regexs, function(regex){
            if (password.match(regex)){
                passwordStrength++;
            }
        });
        if(passwordStrength > 2){
            result = true;
            $("#passtext").css('color', 'green');
            $("#passtext").text("Password allowed, current strength: " + passwordStrength.toString() + " /4");
        }
        else
            $("#passtext").css('color', 'red');
            $("#passtext").text("Use a stronger password, current strength: " + passwordStrength.toString() + " /4"); 
        return result;
    }

    function isValidConfirmPassword(border) //Check second password
    {
        var password = $("#confirmpassword").val();
        result = false;
        if (password == $("#password").val())
        {
            $('#confirmpasstext').css('color', 'green');
            $("#confirmpasstext").text("Passwords match.");   
            result = true;
        }else
        {
            $("#confirmpasstext").text("Make sure the passwords match."); 
            $('#confirmpasstext').css('color', 'red');
        }
        return result;
    }

    function isValidEmail(border) //Check e-mail
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

    function isValidPostal(border) //Check postal code
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

    function isValidHouseNumber(border) //Check house number 
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
    
    //Checks if the two password inputs are the same
    //Return: boolean
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

    //Checks if all inputs are filled in correctly
    //Return: boolean
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