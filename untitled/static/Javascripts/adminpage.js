$(document).ready(function() {
    //Dynamic css
    var sidenavwidth = $("#sidenav").width();
    $('#table').css("margin-left", sidenavwidth + 20 + "px");
    var tableHeight = $("#table").height();
    $('.inputAtAdminpage').css("margin-top", tableHeight + 20 + "px");

    //Fill the table
    $.ajax({
        url: "/AdminPageGetUsers",
        type: 'GET'
    }).done(function (data) {

        var container = $("#userTable");
        for (var i in data) {
            container.append("<tr><td>" + data[i].username + "</td><td>" + data[i].password + "</td><td>" + data[i].email + "</td><td>" + data[i].postal_code + "</td><td>" + data[i].house_number + "</td><td>" + data[i].adminbool + "</td><td>" + data[i].privacywishlist + "</td></tr>");
        }
    });

    $('#DeleteUser').click(function () {

    });

    $('#UpdateUser').click(function () {

    });

    $('#FindUser').click(function () {
        var UsernameAjax = {username: $('#Username').val()};

        $.ajax({
            url: "/GetOneUser",
            data: UsernameAjax,
            datatype: 'json'
        }).done(function (data) {
            if (data == "Username is not found"){

            }
            else{
                $("#Username").val(data.username);
                $("#Password").val(data.password);
                $("#Email").val(data.email);
                $("#Postal_Code").val(data.postal_code);
                $("#House_Number").val(data.house_number);
                $("#Admin_Bool").val(data.adminbool);
                $("#Privacy_Wishlist").val(data.privacywishlist);
            }
        });


    });

});



