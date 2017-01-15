function updatePrivacy(username){
    $.post({
        url: "http://localhost:5000/change_settings"
    });
}

function privacy_OnClick(){
    var username = window.document.cookie.toString().split('=')[1];
    updatePrivacy(username);
    console.log(localStorage.getItem('cart'));
}

$(document).ready(function(){

    $.get({
        url: "http://localhost:5000/change_settings"
    }).done(function(res){
        console.log(res)
        if (res == "True"){       
            $("#privacy-checkbox").prop("checked", true);
        } else {
            $("#privacy-checkbox").prop("checked", false);
        }
    });

});