$(document).ready(function(){
    
   var pathname = $(location).attr('pathname');
   var suburl = pathname.substring(pathname.lastIndexOf('/') + 1);
   var in_stock = null;

   function InsertHTML(json, data){
        var container = $("#product");
        var template = Handlebars.compile(data);
        var context = {title: json[0].name, body: json[0].description, stock: json[0].in_stock, image: json[0].image, id: json[0].id, continent: json[0].continent, classification: json[0].class, price: json[0].price};
        in_stock = json[0].in_stock
        var html    = template(context);
        container.append(html);
    };

   $.ajax({
        xhrFields : {
                withCredentials: true
        },       
        url: "http://localhost:5000/items?id=" + suburl
    }).done(function(json){
        GetTemplate(json);
    });

    function GetTemplate(json){
        $.ajax({
            url: "http://localhost:5000/static/ProductDetail.html"
        }).done(function(data){
            InsertHTML(json, data);
        });
    };

    //EXAMPLE OF INPUT CHANGE EVENT
    /*$('#AmountOfAnimalsToBuy').on('input', function() { 
        var InputText = $(this).val() // get the current value of the input field.
    });*/



    //On click event
    $("#AddToCart").click(function(){
           
        var UserWantsToBuy = parseInt($('#AmountOfAnimalsToBuy').val());
        if (in_stock - UserWantsToBuy >= 0){                                //check if in stock > want to buy
            in_stock = in_stock - $('#AmountOfAnimalsToBuy').val()          //Changes the in stock value 
            $('#AmountInStock').text('Amount in stock: '+ in_stock);        //changes the displayed value
            $('#Notification').text('Animal is succesfully added to cart'); //Notified it worked
        }
        else if(isNaN(UserWantsToBuy) == false){
            $('#Notification').text('You tried to buy more animals than we have');
        }
        
        //when input is not an integer
        else if(isNaN(UserWantsToBuy) == true){
        $('#Notification').text('Your input was not a whole number');
        }
    });




    // Does something after 0.5 second, sets string for div with id=amountinstock
    setTimeout( function(){ 
        $('#AmountInStock').text('Amount in stock: '+ in_stock); 
    }  , 1000 );


});