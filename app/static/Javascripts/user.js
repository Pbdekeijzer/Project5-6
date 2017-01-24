function updatePrivacy(username){
    $.post({
        url: "/change_settings"
    });
}

function privacy_OnClick(){
    var username = window.document.cookie.toString().split('=')[1];
    updatePrivacy(username);
    console.log(localStorage.getItem('cart'));
}

    //copy text to clipboard
function copyToClipboard(text) {
        window.prompt("Copy this link to share!", text);
}

$(document).ready(function(){

    var account = document.getElementById("account_url").innerHTML;
    var des_url = "egois.me/wishlist" + "/" + account;
    document.getElementById("personal-url").innerHTML = "Your personal url: " + "<b>" + des_url + "</br>";
    document.getElementById("hidden-url").innerHTML = des_url;

    GetOrderedItemJson();
    $.get({
        url: "/change_settings"
    }).done(function(res){
        console.log(res)
        if (res == "True"){       
            $("#privacy-checkbox").prop("checked", true);
        } else {
            $("#privacy-checkbox").prop("checked", false);
        }
    });

    function GetOrderedItemJson(){
        var username = window.document.cookie.toString().split('=')[1];
        $.ajax({
            url: '/account/'+ username +'/history'
        }).done(function(json){
            InsertUserProduct(json);
        });
    };

    function InsertUserProduct(json){
        $.ajax({
            url: "/static/OrderedProductPanel.html"
        }).done(function(data){
            var container = $("#ordered_product");
            var template = Handlebars.compile(data);

		    for(var i in json)
		    {
		        var html = "<div class='OrderHistoryContainers' height='500px' style='offset-left-330; border-top:1px solid grey;'>"                
                html += "<label>" + json[i]["time"] + "</label>"
		        for (var j in json[i]["items"])
		        {
                    console.log(json[i]["items"][j])
                    var context = {title: json[i]["items"][j].title,
                                image: json[i]["items"][j].image_route,
                                id: json[i]["items"][j].product_id,
                                price: json[i]["items"][j].price,
                                amount: json[i]["items"][j].amount
                            };
                    html += template(context);
                }
                html += "</div>";
                container.append(html);
            }
        });
    };
});
