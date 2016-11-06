$(document).ready(function(){

    //var IsInWishlist;
    var pathname = $(location).attr('pathname');
    var suburl = pathname.substring(pathname.lastIndexOf('/') + 1);
    var inWishlist = false;

    // setTimeout(function(){
    //     //TODO: Check if user id logged in, hide button if not
    //     //TODO: Selectquery check if product is in users wishlist, change var accordingly
    //     IsInWishlist = true; //temp, remove if todos or done
    //     if (IsInWishlist == true){
    //         $('#wishlistButton').text("Remove from wishlist");
    //     }
    //     else if (IsInWishlist == false){
    //         $('#wishlistButton').text("Add to wishlist");
    //     }
    // }, 1000);

    $('#wishlistButton').click(function(){
        GetItemJson();
        // if (IsInWishlist == true){
        //     //TODO: Delete query, delete product from wishlist
        //     IsInWishlist = false;
        //     $('#wishlistButton').text("Add to wishlist");
        //     $('#Notification').text('Succesfully removed from wishlist');
        // }
        // else if (IsInWishlist == false){
        //     //TODO: Insert query, delete product from wishlist
        //     IsInWishlist = true;
        //     $('#wishlistButton').text("Remove from wishlist");
        //     $('#Notification').text('Succesfully added from wishlist');
        // }
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



