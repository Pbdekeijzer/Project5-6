// remove this to different file
function GetItemJson(id){
    $.ajax({
        url: "/items?id=" + String(id)
    }).done(function(json){
        json = JSON.stringify(json[0]);
        console.log(json);
		AddToWishlist(json);
    });
};

function RemoveFromWishlist(json){
    $.ajax({
        type: "POST",
        url: "/wishlist",
        data: json,
        contentType: "application/json"
    });
};

function AddToWishlist(json){
    $.ajax({
        type: "POST",
        url: "/wishlist",
        data: json,
        contentType: "application/json"
    });
};

function wishlist_onClick(id){
	GetItemJson(id);
}

$(document).ready(function(){
 
    GetJSONFromUrl();
    // Inserts HTML into the product template and appends the HTML in the index.
    // param = json
    function InsertProduct(json){
        $.ajax({       
            url: "/static/ProductPanel.html"
        }).done(function(data){
            var container = $("#wishlistcontent");
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
        $("#wishlistcontent").empty();
    }
	
    // GET JSON from URL, call insert product.
    function GetJSONFromUrl(){
        var url = document.URL
        var account = url.split('/').pop();
        var des_url = "/" + account + "/wishlist";

        $.ajax({
            url: des_url
               
        }).done(function(json){
            RemoveHTMLPanels();
            InsertProduct(json);
        });     
    };     
});