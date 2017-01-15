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
        var account = window.document.cookie.toString().split('=')[1];       
        $.ajax({
            url: "http://localhost:5000/" + account + "/wishlist"   
        }).done(function(json){
            RemoveHTMLPanels();
            InsertProduct(json);
        });     
    };

    if (window.document.cookie){
        var username = window.document.cookie.toString().split('=');
        account_url = "http://localhost:5000/account/"  + username[1];
        $('#NavbarAtTop').append('<li><a href= ' + account_url +  ' id="Account">' + username[1] + '</a></li>');
        $('#NavbarAtTop').append('<li><a href= "http://localhost:5000/logout" id="LogoutNavbar">Log Out</a></li>');
        $('#LogoutNavbar').click(function(){
            localStorage.clear();
        });
    }
    else{  
        var timer = 4;     
        $('#NavbarAtTop').append('<li><a href="/login" id="LoginNavbar">Login</a></li>');
        $('#NavbarAtTop').append('<li><a id="registershit" href="/register">Register</a></li>');   
        $('#wishlist-redirect').text('You must be logged in to see the wishlist.'); 
        $('#wishlist-redirection').text('Redirecting in ')
        $('#redirect-timer').text(timer);


        setInterval(function(){
            timer -= 1;
            $('#redirect-timer').text(timer);

            if (timer == 0){
                window.location.href = "/login";
            }
        }, 1000); 
       
     
        // setTimeout(function(){
        //     window.location.href = "/login";
        // }, 4000);          
    }


});