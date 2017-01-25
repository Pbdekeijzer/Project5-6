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
    var element = document.getElementById("wishlist-buttonID" + String(id));
	var img = document.getElementById("wishlist-imgID" + String(id));

    console.log(img.id);
    console.log(element.id);

	// if ($("#wishlist-buttonID" + id).css("background-color") == "rgb(254, 152, 15)"){
		if (document.getElementById(img.id).style.opacity == 1) {
		$("#wishlist-buttonID" + id).css("background-color", "rgba(254, 152, 15, 0.670588)");		
		document.getElementById(img.id).style.opacity = 0.4;
	}
	else{
		$("#wishlist-buttonID" + id).css("background-color", "rgba(254, 152, 15, 1)");
		document.getElementById(img.id).style.opacity = 1;
	}
	GetItemJson(id);
}

$(document).ready(function(){
 
    var wish_list = [];
    GetJSONFromUrl();
    CreateShareURL();

    function CreateShareURL(){
        var currentLocation = window.location;
        $("#WishlistShareLinkField").val(currentLocation);
    }

    // Inserts HTML into the product template and appends the HTML in the index.
    // param = json
    function InsertProduct(json){
        $.ajax({       
            url: "/static/ProductPanel.html"
        }).done(function(data){

            var container = $("#wishlistcontent");
            var template = Handlebars.compile(data);

            var wish_listID = []; 

			//for each item in the wishlist, push the id to the wish_listID list
			for (var i in wish_list){	
				wish_listID.push(wish_list[i].id);
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

				//if not logged in, hide all wishlist buttons
				if (!window.document.cookie){
					$(".wishlist-button").hide();			
				}
				
				//changes the opacity of the wishlist buttons for the items in the wishlist
				for(var y in wish_listID){	
					if (wish_listID[y] == json[i].id){
						document.getElementById(element.id).style.backgroundColor = "rgba(254, 152, 15, 1)";
						document.getElementById(img.id).style.opacity = 1;										
					}
				}				
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

        var des_url = des_url = "/" + account + "/wishlist";

        $.ajax({
            url: des_url             
        }).done(function(json){
            wish_list = json;
            RemoveHTMLPanels();
            InsertProduct(json);
        });     
    };     
});