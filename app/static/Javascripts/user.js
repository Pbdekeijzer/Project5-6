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

function userfavourites_onClick(id, name){
    var dest = "favlist"
	var favelement = document.getElementById("favlist-buttonID" + String(id));
	var favimg = document.getElementById("favlist-imgID" + String(id));

	// if ($("#wishlist-buttonID" + id).css("background-color") == "rgb(254, 152, 15)"){
		if (document.getElementById(favimg.id).style.opacity == 1) {
		$("#favlist-buttonID" + id).css("background-color", "rgba(254, 152, 15, 0.670588)");		
		document.getElementById(favimg.id).style.opacity = 0.4;
	}
	else{
		$("#favlist-buttonID" + id).css("background-color", "rgba(254, 152, 15, 1)");
		document.getElementById(favimg.id).style.opacity = 1;
	}
    GetItemJson(id);
}

$(document).ready(function(){

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
		        var html = "<div class='OrderHistoryContainers' height='500px' style='offset-left-330; border-top:1px solid grey; align: left'>"                
                html += "<label style='width: 100%; margin-left: 42.5%'>" + json[i]["time"] + "</label>"
		        for (var j in json[i]["items"])
		        {
                    console.log(json[i]["items"][j])
                    var context = {title: json[i]["items"][j].title,
                                image: json[i]["items"][j].image_route,
                                id: json[i]["items"][j].product_id,
                                price: json[i]["items"][j].price,
                                amount: json[i]["items"][j].amount
                            };
                    html += "<div style='align: left'>" + template(context) + "</div>";
                }
                html += "</div>";
                container.append(html);

		        for (var j in json[i]["items"])
		        {
                    var favelement = document.getElementById('favlist-buttonID');
                    favelement.id = favelement.id + String(json[i]["items"][j].product_id);

                    var favimg = document.getElementById('favlist-imgID');
                    favimg.id = favimg.id + String(json[i]["items"][j].product_id);
                }
                

            }
        });
    };
});
