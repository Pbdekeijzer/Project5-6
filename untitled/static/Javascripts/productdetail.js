$(document).ready(function(){

    var pathname = $(location).attr('pathname');
    var suburl = pathname.substring(pathname.lastIndexOf('/') + 1);
    var inWishlist = false; //remove the false when done
    var jsonjs;
    GetItemJson();
    //CheckIfProductInWishlist();


    $('#wishlistButton').click(function(){
        if (inWishlist == true){
            RemoveFromWishlist(jsonjs);
        }
        else if (inWishlist == false){
            AddToWishlist(jsonjs);
        }
    });

    function GetItemJson(){
        $.ajax({
            url: "http://localhost:5000/items?id=" + suburl
        }).done(function(json){
            json = JSON.stringify(json[0]);
            var context = {title: json.name, body: json.description, image: json.image, id: json.id, continent: json.continent, classification: json.class, price: json.price};
            jsonjs = json;
        });
    };

    // function CheckIfProductInWishlist(){   
    //     $.ajax({
    //         url: "http://localhost:5000/account/wishlist",
    //     }).done(function(json){
    //         json = JSON.stringify(json[0]);
    //         inWishlist = false;
            
    //         for(var i in json){
	// 			var context = {title: json[i].name, body: json[i].description, image: json[i].image, id: json[i].id, continent: json[i].continent, classification: json[i].class, price: json[i].price};
	// 			if (context == jsonjs){
    //                 inWishlist = true;
    //                 console.log("I found it!!!");
    //             }
    //         }

    //         if(inWishlist == true){
    //             $('#wishlistButton').text("Remove from wishlist");
    //         }
    //         else{
    //             $('#wishlistButton').text("Add to wishlist");
    //         }
    //     });
    // };


    function RemoveFromWishlist(json){
        $.ajax({
            type: "POST",
            url: "http://localhost:5000/wishlist",
            data: json,
            contentType: "application/json"
        }).done(function(){
            inWishlist = false;
            $('#wishlistButton').text("Add to wishlist");
            $('#Notification').text('Succesfully removed from wishlist');

        });
    };

    function AddToWishlist(json){
        $.ajax({
            type: "POST",
            url: "http://localhost:5000/wishlist",
            data: json,
            contentType: "application/json"
        }).done(function(){
            inWishlist = true;
            $('#wishlistButton').text("Remove from wishlist");
            $('#Notification').text('Succesfully added to wishlist');

        });
    };
});



