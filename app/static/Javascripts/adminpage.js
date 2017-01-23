$(document).ready(function() {
    //Run this on starting the page ---
    //Dynamic css
    $('#NotFoundAlert').hide();
    var DataFromDB = { username: "Username is defined" };
    FillTheTable();

    //Here it ends, from now only event handlers ---



    $('#DeleteUser').click(function () {
        $.when(FindUser($("#Username").val())).done(function(){
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

    });

    $('#UpdateUser').click(function () {

        $.when(FindUser($("#Username").val())).done(function() {
            if (DataFromDB.username != "Username is not found") {
                var AdminSwitch = $("#admin-checkbox").is(":checked").ConvertBoolToInt();
                var PrivacySwitch = $("#privacy-checkbox").is(":checked").ConvertBoolToInt();
                var BlockedSwitch = $("#blocked-checkbox").is(":checked").ConvertBoolToInt();

                var DataToAPI = {
                    username: $("#Username").val(),
                    password: $("#Password").val(),
                    email: $("#Email").val(),
                    postalcode: $("#Postal_Code").val(),
                    housenumber: $("#House_Number").val(),
                    adminbool: AdminSwitch,
                    privacywishlist: PrivacySwitch,
                    blockedbool: BlockedSwitch
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
    });

    $('#FindUser').click(function () {
        $.when(FindUser($("#Username").val())).done(function() {
            if (DataFromDB.username != "Username is not found") {

                $("#Username").val(DataFromDB.username);
                $("#Password").val(DataFromDB.password);
                $("#Email").val(DataFromDB.email);
                $("#Postal_Code").val(DataFromDB.postal_code);
                $("#House_Number").val(DataFromDB.house_number);
                $("#admin-checkbox").prop('checked', DataFromDB.adminbool.ConvertIntToBool());
                $("#privacy-checkbox").prop('checked', DataFromDB.privacywishlist.ConvertIntToBool());
                $("#blocked-checkbox").prop('checked', DataFromDB.blockedbool.ConvertIntToBool());

                ShowAlert('Succesfully found the user', 'lightgreen')
            }
        });
    });

    //Also the table is clickable, and finds this user
    $('#userTable').on('click','.tableRow',function(){
        var usernameViaTable = $(this).find('.usernameInTable').text();
        $.when(FindUser(usernameViaTable)).done(function() {
            if (DataFromDB.username != "Username is not found") {
                $("#Username").val(DataFromDB.username);
                $("#Password").val(DataFromDB.password);
                $("#Email").val(DataFromDB.email);
                $("#Postal_Code").val(DataFromDB.postal_code);
                $("#House_Number").val(DataFromDB.house_number);
                $("#admin-checkbox").prop('checked', DataFromDB.adminbool.ConvertIntToBool());
                $("#privacy-checkbox").prop('checked', DataFromDB.privacywishlist.ConvertIntToBool());
                $("#blocked-checkbox").prop('checked', DataFromDB.blockedbool.ConvertIntToBool());
                ShowAlert('Succesfully found the user', 'lightgreen')
            }
        });
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
        return $.ajax({
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

    function ConvertBoolToInt(){
        if (this == true)
            return 1;
        else
            return 0;
    }

    function ConvertIntToBool(){
        if (this == 1)
            return true;
        else
            return false;
    }



});



