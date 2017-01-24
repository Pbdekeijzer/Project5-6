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
                var AdminSwitch = ConvertBoolToInt($("#admin-checkbox").is(":checked"));
                var PrivacySwitch = ConvertBoolToInt($("#privacy-checkbox").is(":checked"));
                var BlockedSwitch = ConvertBoolToInt($("#blocked-checkbox").is(":checked"));

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
                $("#admin-checkbox").prop('checked', ConvertIntToBool(DataFromDB.adminbool));
                $("#privacy-checkbox").prop('checked', ConvertIntToBool(DataFromDB.privacywishlist));
                $("#blocked-checkbox").prop('checked', ConvertIntToBool(DataFromDB.blockedbool));

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
                $("#admin-checkbox").prop('checked', ConvertIntToBool(DataFromDB.adminbool));
                $("#privacy-checkbox").prop('checked', ConvertIntToBool(DataFromDB.privacywishlist));
                $("#blocked-checkbox").prop('checked', ConvertIntToBool(DataFromDB.blockedbool));
                ShowAlert('Succesfully found the user', 'lightgreen')
            }
        });
    });



    //Functions, mostly because some code is used twice or more

    //Put the following div in the html and copy this js's line 3 in your js, and now you can also use this alert :D
    //<div id='NotFoundAlert'> nothing yet, see function showalert in js</div>
    //For style copy this: <link rel="stylesheet" type="text/css" href="/static/Adminfeatures.css">
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

    function ConvertBoolToInt(TheBool){
        if (TheBool == true)
            return 1;
        else
            return 0;
    }

    function ConvertIntToBool(TheInt){
        if (TheInt == 1)
            return true;
        else
            return false;
    }



});



