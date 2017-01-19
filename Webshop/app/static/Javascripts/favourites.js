$(document).ready(function(){

    GetJSONFromUrl();
    // Inserts HTML into the product template and appends the HTML in the index.
    // param = json
    function InsertProduct(json){
        $.ajax({
            url: "/static/ProductPanel.html"
        }).done(function(data){
            var container = $("#favouritescontent");
            var template = Handlebars.compile(data);
            for(var i in json){
				var context = {title: json[i].name, body: json[i].description, image: json[i].image, id: json[i].id, continent: json[i].continent, classification: json[i].class, price: json[i].price};
				var html = template(context);
				container.append(html);
            }
        });
    };

	//Empty all
    function RemoveHTMLPanels(){
        $("#favouritescontent").empty();
    }

    // GET JSON from URL, call insert product.
    function GetJSONFromUrl(){
        $.ajax({
            url: "/account/favourites"
        }).done(function(json){
            RemoveHTMLPanels();
            InsertProduct(json);
        });
    };



});