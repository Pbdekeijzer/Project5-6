$(document).ready(function(){
   var pathname = $(location).attr('pathname');
   var suburl = pathname.substring(pathname.lastIndexOf('/') + 1);

   function InsertHTML(json, data){
        var container = $("#product");
        var template = Handlebars.compile(data);
        var context = {title: json[0].name, body: json[0].description /*+ "\n In stock: " + json[0].in_stock*/, image: json[0].image, id: json[0].id};
        var html    = template(context);
        container.append(html);
    };

   $.ajax({       
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

});