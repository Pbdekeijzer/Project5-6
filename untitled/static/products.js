$(document).ready(function(){
   var pathname = $(location).attr('pathname');
   var suburl = pathname.substring(pathname.lastIndexOf('/') + 1);
   console.log(suburl);

   $.ajax({       
        url: "http://localhost:5000/items?id=" + suburl
    }).done(function(data){
        InsertHTML(data);
    });

    function InsertHTML(json){
        var container = $("#product");
        var template = Handlebars.compile(json);
        var context = {title: json[i].name, body: json[i].description, image: json[i].image, id: json[i].id};
        var html    = template(context);
        container.append(html);
    }
});