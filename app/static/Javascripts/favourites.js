var dest = "";

function GetItemJson(id){
    $.ajax({
        url: "/items?id=" + String(id)
    }).done(function(json){
        json = JSON.stringify(json[0]);
        if (dest == "wishlist"){
            AddToWishlist(json);
        }
        else{
            AddToFavourites(json);
        }

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

function AddToWishlist(json){
    $.ajax({
        type: "POST",
        url: "/wishlist",
        data: json,
        contentType: "application/json"
    });
};

function wishlist_onClick(id){
	var element = document.getElementById("wishlist-buttonID" + String(id));
	var img = document.getElementById("wishlist-imgID" + String(id));

	// if ($("#wishlist-buttonID" + id).css("background-color") == "rgb(254, 152, 15)"){
		if (document.getElementById(img.id).style.opacity == 1) {
		$("#wishlist-buttonID" + id).css("background-color", "rgba(254, 152, 15, 0.670588)");		
		document.getElementById(img.id).style.opacity = 0.4;
	}
	else{
		$("#wishlist-buttonID" + id).css("background-color", "rgba(254, 152, 15, 1)");
		document.getElementById(img.id).style.opacity = 1;
    }

    dest = "wishlist";
    GetItemJson(id);
}

function RemoveFromFavourites(json){
    $.ajax({
        type: "POST",
        url: "/favourites",
        data: json,
        contentType: "application/json"
    });
};

//If favourites button is pressed
function favourites_onClick(id, name){
    var dest = "favlist";

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

    var fav_list = [];
    var wish_list = [];
    
    if(window.location.href.indexOf("favourites") > -1) {
        GetJSONFromUrl();
        GetWishlistItems();
    }

    // Inserts HTML into the product template and appends the HTML in the index.
    // param = json
    function InsertProduct(json){
        $.ajax({
            url: "/static/FavouriteProductPanel.html"
        }).done(function(data){
            var container = $("#favouritescontent");
            var template = Handlebars.compile(data);

			var wish_listID = []; 
            var fav_listID = [];

			//for each item in the wishlist, push the id to the wish_listID list
			for (var i in wish_list){	
				wish_listID.push(wish_list[i].id);
			}

            for (var i in fav_list){
                fav_listID.push(fav_list[i].id);
            }

            for(var i in json){
				var context = {title: json[i].name, body: json[i].description, image: json[i].image, id: json[i].id, continent: json[i].continent, classification: json[i].class, price: json[i].price, stock: json[i].in_stock};
				var html = template(context);
				container.append(html);

				//for each item, get the wishlist button id and change that to the wishlist button id + product id
				var element = document.getElementById("wishlist-buttonID");
				element.id = element.id + (parseInt(json[i].id));
		
				var img = document.getElementById("wishlist-imgID");
				img.id = img.id + (parseInt(json[i].id));

                var favelement = document.getElementById("favlist-buttonID");
                favelement.id = favelement.id + (parseInt(json[i].id));

                var favimg = document.getElementById("favlist-imgID");
                favimg.id = favimg.id + (parseInt(json[i].id));
				
				//changes the opacity of the wishlist buttons for the items in the wishlist
				for(var y in wish_listID){	
					if (wish_listID[y] == json[i].id){
						document.getElementById(element.id).style.backgroundColor = "rgba(254, 152, 15, 1)";
						document.getElementById(img.id).style.opacity = 1;										
					}
				}

                for(var y in fav_listID){
                    if(fav_listID[y] == json[i].id){
                        document.getElementById(favelement.id).style.backgroundColor = "rgba(254, 152, 15, 1)";
                        document.getElementById(favimg.id).style.opacity = 1;
                    }   
                }
            }
        });
    };

	//get all items from the wishlist
	//Return: json
	function GetWishlistItems(){
        var url = document.URL
        var account = document.getElementById("account_url").innerHTML;
        var des_url = des_url = "/" + account + "/wishlist";
        $.ajax({
            url: des_url,
			contentType : "application/json",     
        }).done(function(json){
			wish_list = json;
        });     
    } 

	//Empty all
    function RemoveHTMLPanels(){
        $("#favouritescontent").empty();
    }

    // GET JSON from URL, call insert product.
    function GetJSONFromUrl(){
        var account = window.document.cookie.toString().split('=')[1].slice(1);
        $.ajax({
            url: "/" + account + "/favourites"

        }).done(function(json){
            fav_list = json;
            GetWishlistItems();
            RemoveHTMLPanels();
            InsertProduct(json);
        });
    };
        // setTimeout(function(){
        //     window.location.href = "/login";
        // }, 4000);
});