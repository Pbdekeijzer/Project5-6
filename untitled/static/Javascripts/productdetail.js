$(document).ready(function(){

    var IsInWishlist;
    

    setTimeout(function(){
        //TODO: Check if user id logged in, hide button if not
        //TODO: Selectquery check if product is in users wishlist, change var accordingly
        IsInWishlist = true; //temp, remove if todos or done
        if (IsInWishlist == true){
            $('#wishlistButton').text("Remove from wishlist");
        }
        else if (IsInWishlist == false){
            $('#wishlistButton').text("Add to wishlist");
        }
    }, 1000);

    $('#wishlistButton').click(function(){
        if (IsInWishlist == true){
            //TODO: Delete query, delete product from wishlist
            IsInWishlist = false;
            $('#wishlistButton').text("Add to wishlist");
            $('#Notification').text('Succesfully removed from wishlist');
        }
        else if (IsInWishlist == false){
            //TODO: Insert query, delete product from wishlist
            IsInWishlist = true;
            $('#wishlistButton').text("Remove from wishlist");
            $('#Notification').text('Succesfully added from wishlist');


        }
        


    });

});



