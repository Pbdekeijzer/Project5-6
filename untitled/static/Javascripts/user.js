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
    GetOrderedItemJson();
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
            url: "http://localhost:5000/static/OrderedProductPanel.html"
        }).done(function(data){
            var container = $("#ordered_product");
            var template = Handlebars.compile(data);

		    for(var i in json)
		    {
		        var html = "<div class='container1' height='500px' style='color:#0000FF' offset-left-330>"
		        for (var j in json[i])
		        {
			        for (var x in json[i][j])
			        {
			            var context = {title: json[i][j][x].name, body: json[i][j][x].description,
			                           image: json[i][j][x].image, id: json[i][j][x].id,
			                           continent: json[i][j][x].continent, classification: json[i][j][x].class,
			                           price: json[i][j][x].price
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
