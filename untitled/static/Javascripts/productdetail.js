$(document).ready(function(){

    var pathname = $(location).attr('pathname');
    var suburl = pathname.substring(pathname.lastIndexOf('/') + 1);
    var inWishlist = false;

    if(window.document.cookie){
        $('#wishlistButton').show();
    } else{
        $('#wishlistButton').hide();
    }
    

    $('#wishlistButton').click(function(){
        GetItemJson();
    });

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



