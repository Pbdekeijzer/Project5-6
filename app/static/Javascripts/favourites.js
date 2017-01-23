function GetItemJson(id){
    $.ajax({
        url: "/items?id=" + String(id)
    }).done(function(json){
        json = JSON.stringify(json[0]);
        console.log(json);
		AddToFavourites(json);
    });
};

function AddToFavourites(json){
    $.ajax({
        type: "POST",
        url: "/favourites",
        data: json,
        contentType: "application/json"
    });
};

function RemoveFromFavourites(json){
    $.ajax({
        type: "POST",
        url: "/favourites",
        data: json,
        contentType: "application/json"
    });
};

function favourites_onClick(id, name){
	GetItemJson(id);
	popup(name, "favourites");
}

$(document).ready(function(){

    GetJSONFromUrl();
    // Inserts HTML into the product template and appends the HTML in the index.
    // param = json
    function InsertProduct(json){
        $.ajax({
            url: "/static/FavouriteProductPanel.html"
        }).done(function(data){
            var container = $("#favouritescontent");
            var template = Handlebars.compile(data);
            for(var i in json){
				var context = {title: json[i].name, body: json[i].description, image: json[i].image, id: json[i].id, continent: json[i].continent, classification: json[i].class, price: json[i].price, stock: json[i].in_stock};
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
        var account = window.document.cookie.toString().split('=')[1].slice(1);
        console.log("/" + account + "/favourites")
        $.ajax({
            url: "/" + account + "/favourites"

        }).done(function(json){
            RemoveHTMLPanels();
            InsertProduct(json);
        });
    };
        // setTimeout(function(){
        //     window.location.href = "/login";
        // }, 4000);
});