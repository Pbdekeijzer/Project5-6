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
            InsertProduct(json);
        });
    };

    function InsertProduct(json){
        $.ajax({
            url: "/static/OrderedProductPanel.html"
        }).done(function(data){
            var container = $("#ordered_product");
            var template = Handlebars.compile(data);

		    for(var i in json)
		    {
		        var html = "<div class='OrderHistoryContainers' height='500px' style='background-color:#FCFCFC; offset-left-330; border:1px solid black; border-radius:50px; padding-left:20%;'>"
		        for (var j in json[i])
		        {
			        for (var x in json[i][j])
			        {
			            var context = {title: json[i][j][x].title,
                                 image: json[i][j][x].image_route,
                                 id: json[i][j][x].product_id,
                                 price: json[i][j][x].price,
                                 amount: json[i][j][x].amount
                                };
			            html += template(context);
			        }
                }
                html += "</div>";
                container.append(html);
            }
        });
    };
});
