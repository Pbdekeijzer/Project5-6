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
        $('#NavbarAtTop').append('<li><a href= "http://localhost:5000/logout" id="LogoutNavbar">Log Out</a></li>');
    } else{
        $('#wishlistButton').hide();
        $('#favouriteButton').hide();
        $('#NavbarAtTop').append('<li><a href="/login" id="LoginNavbar">Login</a></li>');
        $('#NavbarAtTop').append('<li><a id="registershit" href="/register">Register</a></li>');        
    }

    
    $('#wishlistButton').click(function(){
        if (inWishlist == true){
            RemoveFromWishlist(jsonjs);
        }
        else if (inWishlist == false){
            AddToWishlist(jsonjs);

    $('#favouriteButton').click(function(){
        if (inWishlist == true){
            RemoveFromFavourites(jsonjs);
        }
        else if (inWishlist == false){
            AddToFavourites(jsonjs);
    }});

    //Uses this function twice at start for some reason
    function getWishlistIDs(){
        $.ajax({
                url: "http://localhost:5000/account/wishlist"
            }).done(function(json){
                json = JSON.stringify(json);
                console.log("lol");
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

        function getFavouriteIDs(){
        $.ajax({
                url: "http://localhost:5000/account/favourites"
            }).done(function(json){
                json = JSON.stringify(json);
                console.log("lol2");
                $.each(JSON.parse(json), function(idx, obj) {
                    favouriteitems.push(obj.id); });

                favouriteitems.forEach(function(element){
                    if (element == suburl){
                        $("#favouriteButton").text("Remove from favourites");
                        inFavourites = true;
                    }
                });
            });
    }


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
            $('#wishlistButton').text("Add to wishlist");
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
            $('#wishlistButton').text("Remove from wishlist");
            inWishlist = true;
        });
    };

        function RemoveFromFavourites(json){
        $.ajax({
            type: "POST",
            url: "http://localhost:5000/favourites",
            data: json,
            contentType: "application/json"
        }).done(function(){
            $('#favouriteButton').text("Add to favourites");
            inFavourites = false;
        });
    };

    function AddToFavourites(json){
        $.ajax({
            type: "POST",
            url: "http://localhost:5000/favourites",
            data: json,
            contentType: "application/json"
        }).done(function(){
            $('#wishlistButton').text("Remove from favourites");
            inFavourites = true;
        });
    };
});
