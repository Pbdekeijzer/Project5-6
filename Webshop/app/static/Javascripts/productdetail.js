$(document).ready(function(){
    var pathname = $(location).attr('pathname');
    var suburl = pathname.substring(pathname.lastIndexOf('/') + 1);
    var inWishlist = false;
    var inFavourites = false;
    var jsonjs;
    var wishlistitems = [];
    var favouriteitems = [];

    getWishlistIDs();
    getFavouriteIDs();
    GetItemJson();

    if(window.document.cookie){
        $('#wishlistButton').show();
        $('#favouriteButton').show();
    } else{
        $('#wishlistButton').hide();
        $('#favouriteButton').hide();
    }

    
    $('#wishlistButton').click(function(){
        if (inWishlist == true){
            RemoveFromWishlist(jsonjs);
        }
        else if (inWishlist == false){
            AddToWishlist(jsonjs);
    }});

    $('#favouriteButton').click(function(){
        if (inFavourites == true){
            RemoveFromFavourites(jsonjs);
        }
        else if (inFavourites == false){
            AddToFavourites(jsonjs);
    }});

    //Uses this function twice at start for some reason
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
});
