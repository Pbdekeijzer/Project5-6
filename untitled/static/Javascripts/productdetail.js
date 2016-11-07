$(document).ready(function(){

<<<<<<< Updated upstream
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
=======
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
>>>>>>> Stashed changes
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

<<<<<<< Updated upstream
    function GetItemJson(){
        $.ajax({
            url: "http://localhost:5000/items?id=" + suburl
        }).done(function(json){
            json = JSON.stringify(json[0]);
            jsonjs = json;
        });
    };

    function RemoveFromWishlist(json){
=======
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
>>>>>>> Stashed changes
        $.ajax({
            type: "POST",
            url: "http://localhost:5000/wishlist",
            data: json,
            contentType: "application/json"
        }).done(function(){
<<<<<<< Updated upstream
            inWishlist = false;
            $('#wishlistButton').text("Add to wishlist");
            $('#Notification').text('Succesfully removed from wishlist');
=======
            inWishlist = true;
        });
    };
});
>>>>>>> Stashed changes

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
