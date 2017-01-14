$(document).ready(function()
{
    //Dynamic css
    var sidenavwidth = $("#sidenav").width();
    $('#table').css("margin-left", sidenavwidth+20+"px");
    var tableHeight = $("#table").height();
    $('.inputAtAdminpage').css("margin-top", tableHeight+20+"px");

    //be able to filter users?


    $.ajax({       
            url: "/AdminPageGetUsers",
            type : 'GET'
        }).done(function(data){

            var container = $("#userTable");
            //var template = Handlebars.compile(data);
            for(var i in data){
				container.append("<tr><td>"+ data[i].username +"</td><td>"+ data[i].password +"</td><td>"+ data[i].email +"</td><td>"+ data[i].postal_code +"</td><td>"+ data[i].house_number +"</td><td>"+ data[i].adminbool +"</td><td>"+ data[i].privacywishlist +"</td></tr>");
                //var context = {title: json[i].name, body: json[i].description, image: json[i].image, id: json[i].id, continent: json[i].continent, classification: json[i].class, price: json[i].price};
				//var html = template(context);
				//container.append(html);
            }
        });

        $('#DeleteUser').click(function(){

        });

        $('#UpdateUser').click(function(){
            
        });

        $('#FindUser').click(function(){
            
        });



});