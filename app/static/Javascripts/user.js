//update privacy of the personal wishlist
function updatePrivacy(username){
    $.post({
        url: "/change_settings"
    });
}

//called when privacy button clicked
function privacy_OnClick(){
    var username = window.document.cookie.toString().split('=')[1];
    updatePrivacy(username);
}

//copy text to clipboard
function copyToClipboard(text) {
        window.prompt("Copy this link to share!", text);
}

$(document).ready(function(){

    GetOrderedItemJson();

    //check is privacy is on or off
    $.get({
        url: "/change_settings"
    }).done(function(res){
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

    //get orders and insert the items with the orders in the HTML
    function InsertUserProduct(json){
        $.ajax({
            url: "/static/OrderedProductPanel.html"
        }).done(function(data){
            var container = $("#ordered_product");
            var template = Handlebars.compile(data);

		    for(var i in json)
		    {
                var totalPrice = 0;
		        var html = "<div class='OrderHistoryContainers' height='500px' style='offset-left-330; border-top:1px solid grey; align: left'>"                
                html += "<label id='OrderStats' style='width: 100%; margin-left: 42.5%'>" + json[i]["time"] + "<br>TotalPrice: € {{Totalprice}},-" + "</label>"
		        for (var j in json[i]["items"])
		        {
                    var context = {title: json[i]["items"][j].title,
                                image: json[i]["items"][j].image_route,
                                id: json[i]["items"][j].product_id,
                                price: json[i]["items"][j].price,
                                amount: json[i]["items"][j].amount
                            };
                    html += "<div style='align: left'>" + template(context) + "</div>";
                    totalPrice = totalPrice + (parseInt(json[i]["items"][j].price) * parseInt(json[i]["items"][j].amount));
                }
                html += "</div>";
		        testo = Handlebars.compile(html);
		        html = testo({Totalprice: totalPrice});
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
