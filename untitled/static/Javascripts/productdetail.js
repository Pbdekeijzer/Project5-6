$(document).ready(function(){

    var pathname = $(location).attr('pathname');
    var suburl = pathname.substring(pathname.lastIndexOf('/') + 1);
    var inWishlist = false;
    var wishlistitems = [];
    getWishlistIDs();

    function getWishlistIDs(){
        $.ajax({
                url: "http://localhost:5000/account/wishlist"
            }).done(function(json){
                json = JSON.stringify(json);
                // for (var i in json){
                //     var test = {title: json[i].name, body: json[i].description, image: json[i].image, id: json[i].id, continent: json[i].continent, classification: json[i].class, price: json[i].price};

                //     console.log(test[0]); 
                // }
                $.each(JSON.parse(json), function(idx, obj) {
                    wishlistitems.push(obj.id); });
                    
                wishlistitems.forEach(function(element){
                    console.log(element);
                    if (element == suburl){
                        $("#wishlistButton").text("Remove from wishlist");
                        inWishlist == true;
                    }
                    else{
                        console.log('FALSESESSEAS');
                    }
                });        
            }); 
    }
   
    $('#wishlistButton').click(function(){
        if (inWishlist == false) {
            $("#wishlistButton").text("Add to wishlist"); }
        else {
            $("#wishlistButton").text("Remove from wishlist")
        }
        GetItemJson();

        
    });

    // function GetItemID(){
    //     $.ajax({
    //         url: "http://localhost:5000/items?id=" + suburl
    //     }).done(function(json){
    //         json = JSON.stringify(json); 
    //         $.each(JSON.parse(json), function(idx, obj) {
	//             itemid.push(obj.id); 
    //         });

    //         console.log(itemid[0])            
    //     });
    // };


    function GetItemJson(){
        $.ajax({
            url: "http://localhost:5000/items?id=" + suburl
        }).done(function(json){
            json = JSON.stringify(json[0]); 
            if(inWishlist){
                RemoveFromWishlist(json);
            }
            else{
                AddToWishlist(json);
            }
        });
    };

    function RemoveFromWishlist(json){
        $.ajax({
            type: "POST",
            url: "http://localhost:5000/wishlist",
            data: json,
            contentType: "application/json"
        }).done(function(){
            inWishlist = false;
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
        });
    };
});



