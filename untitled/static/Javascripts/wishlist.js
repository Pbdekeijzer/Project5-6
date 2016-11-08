$(document).ready(function(){
 
    GetJSONFromUrl();
    // Inserts HTML into the product template and appends the HTML in the index.
    // param = json
    function InsertProduct(json){
        $.ajax({       
            url: "http://localhost:5000/static/ProductPanel.html"
        }).done(function(data){
            var container = $("#wishlistcontent");
            var template = Handlebars.compile(data);
            for(var i in json){
				var context = {title: json[i].name, body: json[i].description, image: json[i].image, id: json[i].id, continent: json[i].continent, classification: json[i].class, price: json[i].price};
				var html = template(context);
				container.append(html);
            }
        });
    };
		
	//Empty all
    function RemoveHTMLPanels(){
        $("#wishlistcontent").empty();
    }
	
    // GET JSON from URL, call insert product.
    function GetJSONFromUrl(){
        $.ajax({       
            url: "http://localhost:5000/account/wishlist"   
        }).done(function(json){
            RemoveHTMLPanels();
            InsertProduct(json);
        });     
    };

    if (window.document.cookie){
        $('#NavbarAtTop').append('<li><a href= "http://localhost:5000/logout" id="LogoutNavbar">Log Out</a></li>');
    }
    else{
        $('#NavbarAtTop').append('<li><a href="/login" id="LoginNavbar">Login</a></li>');
        $('#NavbarAtTop').append('<li><a id="registershit" href="/register">Register</a></li>');       
    }


});