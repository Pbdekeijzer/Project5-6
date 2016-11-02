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
        $.ajax(
            {
                url : "http://localhost:5000/login",
                data: $('form').serialize(),
                type : 'POST',
                success: function(response) 
                         {
                            console.log(response);
                         }
            });
    });
});