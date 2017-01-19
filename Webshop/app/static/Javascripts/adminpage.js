$(document).ready(function() {
    //Run this on starting the page ---
    //Dynamic css
    $('#NotFoundAlert').hide();
    var DataFromDB = { username: "Username is defined" };
    FillTheTable();

    //Here it ends, from now only event handlers ---

    //If someone enters word or number in the boolinput
    $('.booleanitmust').on('input', function() {
        if (parseInt($(this).val()) == 1 || parseInt($(this).val()) == 0 || $(this).val() == ""){}//It is accepted

        //It is a string that is not convertableto int, make the inputbox the same value as in the database
        else if (this.id == 'Admin_Bool'){
            $(this).val(parseInt(DataFromDB.adminbool));
            ShowAlert('Only use the number 0 or 1', 'lightsalmon');
        }
        else{
            $(this).val(parseInt(DataFromDB.privacywishlist));
            ShowAlert('Only use the number 0 or 1', 'lightsalmon');
        }

    });


    $('#DeleteUser').click(function () {
        FindUser($("#Username").val());
        if (DataFromDB.username != "Username is not found") {
            var DataToAPI = {username: $("#Username").val()}
            $.ajax({
                url: "/DeleteOneUser",
                data: DataToAPI,
                datatype: 'json'
            }).done(function (data) {
                if (data.CommitSuccess == "User is successfully deleted") {
                    ShowAlert(data.CommitSuccess, 'lightgreen');
                    FillTheTable();
                }
                else {
                    ShowAlert(data.CommitSuccess, 'lightcoral');
                }
            });
        }
    });

    $('#UpdateUser').click(function () {

        FindUser($("#Username").val());
        if (DataFromDB.username != "Username is not found") {
            var DataToAPI = {
                username: $("#Username").val(),
                password: $("#Password").val(),
                email: $("#Email").val(),
                postalcode: $("#Postal_Code").val(),
                housenumber: $("#House_Number").val(),
                adminbool: $("#Admin_Bool").val(),
                privacywishlist: $("#Privacy_Wishlist").val()
            };

            $.ajax({
                url: "/UpdateOneUser",
                data: DataToAPI,
                datatype: 'json'
            }).done(function (data) {
                if (data.CommitSuccess == "User is successfully updated") {
                    ShowAlert(data.CommitSuccess, 'lightgreen');
                    FillTheTable();
                }
                else {
                    ShowAlert(data.CommitSuccess, 'lightcoral');
                }
            });

        }

    });

    $('#FindUser').click(function () {
        FindUser($('#Username').val());
        if (DataFromDB.username != "Username is not found") {
            $("#Username").val(DataFromDB.username);
            $("#Password").val(DataFromDB.password);
            $("#Email").val(DataFromDB.email);
            $("#Postal_Code").val(DataFromDB.postal_code);
            $("#House_Number").val(DataFromDB.house_number);
            $("#Admin_Bool").val(DataFromDB.adminbool);
            $("#Privacy_Wishlist").val(DataFromDB.privacywishlist);
            ShowAlert('Succesfully found the user', 'lightgreen')
        }

    });

    //Also the table is clickable, and finds this user
    $('#userTable').on('click','.tableRow',function(){
        var usernameViaTable = $(this).find('.usernameInTable').text();
        FindUser(usernameViaTable);
        if (DataFromDB.username != "Username is not found"){
            $("#Username").val(DataFromDB.username);
            $("#Password").val(DataFromDB.password);
            $("#Email").val(DataFromDB.email);
            $("#Postal_Code").val(DataFromDB.postal_code);
            $("#House_Number").val(DataFromDB.house_number);
            $("#Admin_Bool").val(DataFromDB.adminbool);
            $("#Privacy_Wishlist").val(DataFromDB.privacywishlist);
            ShowAlert('Succesfully found the user', 'lightgreen')
        }
    });



    //Functions, mostly because some code is used twice or more
    function ShowAlert(text, color){
        $('#NotFoundAlert').empty();
        $('#NotFoundAlert').text(text);
        $('#NotFoundAlert').css('background-color', color);
        $('#NotFoundAlert').show();
        $('#NotFoundAlert').delay(3500).hide(1200);
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
                    "<th>Blocked</th>"+
                    "</tr>");
            for (var i in data) {
                container.append("<tr class='tableRow'><td class='usernameInTable'>" + data[i].username + "</td><td>" + data[i].password + "</td><td>" + data[i].email + "</td><td>" + data[i].postal_code + "</td><td>" + data[i].house_number + "</td><td>" + data[i].adminbool + "</td><td>" + data[i].privacywishlist + "</td><td>" +data[i].blockedbool+ "</td></tr>");
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
                DataFromDB.username = data.username;
                ShowAlert('Could not find this user', 'lightcoral')
            }
            else{
                DataFromDB = data;
            }
        });

    }



});



