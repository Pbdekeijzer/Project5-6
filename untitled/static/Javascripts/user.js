function updatePrivacy(username){
    $.post({
        url: "http://localhost:5000/change_settings"
    });
}

function privacy_OnClick(){
    updatePrivacy(username)
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
            url: "http://localhost:5000/static/ProductPanel.html"
        }).done(function(data){
            var container = $("#ordered_product");
            var template = Handlebars.compile(data);

		    for(var i in json)
		    {
		        //console.log(i)
		        for (var j in json[i])
		        {
		            console.log(json[i][j])
		            var context = {title: json[i][j].name, body: json[i][j].description, image: json[i][j].image, id: json[i][j].id, continent: json[i][j].continent, classification: json[i][j].class, price: json[i][j].price};
			        var html = template(context);
			        container.append(html);
                }
            }
        });
    };
});
