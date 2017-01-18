$(document).ready(function() {
    //Run this on starting the page ---
    //Dynamic css
    var sidenavwidth = $("#sidenav").width();
    $('#table').css("margin-left", sidenavwidth + 20 + "px");
    $('#NotFoundAlert').hide();

    FillTheTable();

    //Here it ends, from now only event handlers ---

    $('#DeleteUser').click(function () {

    });

    $('#UpdateUser').click(function () {

    });

    $('#FindUser').click(function () {
        FindUser($('#Username').val());

    });

    $('#userTable').on('click','.tableRow',function(){
        var usernameViaTable = $(this).find('.usernameInTable').text();
        FindUser(usernameViaTable);
    });



    //pops up a div with a text and color background
    function ShowAlert(text, color){
        $('#NotFoundAlert').empty();
        $('#NotFoundAlert').text(text);
        $('#NotFoundAlert').css('background-color', color);
        $('#NotFoundAlert').show();
        $('#NotFoundAlert').delay(3500).hide(1000);
    }

    function FillTheTable(){
        $.ajax({
            url: "/AdminPageGetUsers",
            type: 'GET'
        }).done(function (data) {

            var container = $("#userTable");
            container.empty();
            container.append("<tr>"+
                    "<th>Username</th>"+
                    "<th>Password</th>"+
                    "<th>Email</th>"+
                    "<th>Postal Code</th>"+
                    "<th>Housenumber</th>"+
                    "<th>Adminbool</th>"+
                    "<th>Privacy Wishlist</th>"+
                +"</tr>")
            for (var i in data) {
                container.append("<tr class='tableRow'><td class='usernameInTable'>" + data[i].username + "</td><td>" + data[i].password + "</td><td>" + data[i].email + "</td><td>" + data[i].postal_code + "</td><td>" + data[i].house_number + "</td><td>" + data[i].adminbool + "</td><td>" + data[i].privacywishlist + "</td></tr>");
            }
        });

    }

    function FindUser(UsernameAjax){

        UsernameAjax = {username: UsernameAjax};
        $.ajax({
            url: "/GetOneUser",
            data: UsernameAjax,
            datatype: 'json'
        }).done(function (data) {
            if (data.username == "Username is not found"){
                ShowAlert('Could not find this user', 'lightcoral')
            }
            else{
                $("#Username").val(data.username);
                $("#Password").val(data.password);
                $("#Email").val(data.email);
                $("#Postal_Code").val(data.postal_code);
                $("#House_Number").val(data.house_number);
                $("#Admin_Bool").val(data.adminbool);
                $("#Privacy_Wishlist").val(data.privacywishlist);
                ShowAlert('Succesfully found the user', 'lightgreen')
            }
        });

    }



});



