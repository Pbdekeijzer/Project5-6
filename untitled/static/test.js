$(document).ready(function(){

    var source   = $("#entry-template").html();
    var template = Handlebars.compile(source);
    var context = {title: "My New Post", body: "This is my first post!"};
    var html    = template(context);
    console.log(html);
    $('.test').append(html);

    $("#shit").click(function(param){
        $.ajax({       
            url: "http://localhost:5000/" + param,   
        }).done(function(json){
                
        }); 

    });
    
    $.ajax({       
        url: "http://localhost:5000/static/ProductPanel.html"
 
        }).done(function(json){

                    var template = Handlebars.compile(json);
                    var context = {title: "My New Post", body: "This is my first post!"};
                    var html    = template(context);
                    console.log(html);
                    $('.test').append(html);
        }); 

});