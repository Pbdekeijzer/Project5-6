$(document).ready(function(){
    
   var pathname = $(location).attr('pathname');
   var suburl = pathname.substring(pathname.lastIndexOf('/') + 1);
   var in_stock = null;


   //insert product in HTML
   function InsertHTML(json, data){
        var container = $("#product");
        $(".wishlist-button").hide();
        $("#wishlistButton").hide();
        var template = Handlebars.compile(data);
        var context = {title: json[0].name, body: json[0].description, stock: json[0].in_stock, image: json[0].image, id: json[0].id, continent: json[0].continent, classification: json[0].class, price: json[0].price};
        in_stock = json[0].in_stock;
        var html    = template(context);
        container.append(html);
        $(".wishlist-button").hide();
        $("#wishlistButton").hide();
    };

   $.ajax({
        xhrFields : {
                withCredentials: true
        },       
        url: "/items?id=" + suburl
    }).done(function(json){
        GetTemplate(json);
        $(".wishlist-button").hide();
        $("#wishlistButton").hide();
    });

    function GetTemplate(json){
        $.ajax({
            url: "/static/ProductDetail.html"
        }).done(function(data){
            $(".wishlist-button").hide();
            $("#wishlistButton").hide();
            InsertHTML(json, data);
        });
    };
});