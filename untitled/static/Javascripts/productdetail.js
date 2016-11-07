$(document).ready(function(){

    var pathname = $(location).attr('pathname');
    var suburl = pathname.substring(pathname.lastIndexOf('/') + 1);
    var inWishlist = false; 
    var jsonjs;
    var wishlistitems = [];
    $('#wishlistButton').hide();
    getWishlistIDs();
    GetItemJson();
    //CheckIfProductInWishlist();
    $('#wishlistButton').show();



    if(window.document.cookie){
        $('#wishlistButton').show();
    } else{
        $('#wishlistButton').hide();
    }
    

    function getWishlistIDs(){
        $.ajax({
                url: "http://localhost:5000/account/wishlist"
            }).done(function(json){
                json = JSON.stringify(json);

                $.each(JSON.parse(json), function(idx, obj) {
                    wishlistitems.push(obj.id); });
                    
                wishlistitems.forEach(function(element){
                    if (element == suburl){
                        $("#wishlistButton").text("Remove from wishlist");               
                        inWishlist = true;
                    }
                });        
            }); 
    }
   
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
            jsonjs = json;
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
