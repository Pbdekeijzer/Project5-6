var cart = [];

//not used
function appendToStorage(name, data){
    var old = localStorage.getItem(name);
    if(old === null) old = "";
    localStorage.setItem(name, old + data);
}

function cart_onClick(id, name, price){
	AddToCart(id, name, price);
}

function AddToCart(id, name, price) {

	// load cart data from local storage
	if (localStorage.cart)
	{
		cart = JSON.parse(localStorage.cart);  
	}

	// Retrieve the cart object from local storage
	if (localStorage){
		var pid = id;
		var pname = name;
		var pprice_string = price;
		var pprice = parseInt(pprice_string);
		var pquantity = 1; //can change this to dropdown value?

		var product = { ID : pid, Name: pname, Price: pprice, Quantity: pquantity };
		console.log(product);
		//didnt work without the if statement on cart.length for some reason
		if (cart.length > 0){
			for(var i in cart){
				if (cart[i].Name == pname){
					cart[i].Quantity += 1;
					cart[i].Price += pprice;
					saveCart(cart);
					console.log("Item already exists");
					console.log(cart[i].Price);
                    console.log(cart[i].Quantity);
					return;
				}             
			}  
		}    

		console.log("Item not yet in cart");
		cart.push(product);
		saveCart(cart);
		return;
	} 
}

//Save cart
function saveCart(cart){
	if (window.localStorage)
	{
		localStorage.setItem('cart', JSON.stringify(cart));
	}
}

//Delete from cart
function deleteItem(index){
    cart = JSON.parse(localStorage.cart);

    for (var i in cart){
        if (i == index){
            if (cart[i].Quantity > 1){
                //update item at index
                cart[i].Quantity -= 1;              
            }
            else{
                //delete item at index
                cart.splice(i, 1);
            }
        }      
    }
    //try without first
    // newcart = JSON.stringify(cart);
   
    saveCart(cart);
    showCart();
}

function OrderAjax(){
    var cart = [];
    var orderItems = [];
    cart = JSON.parse(localStorage.cart);

    for (var i in cart) {
        var item = cart[i];
        var itemDetails = [item.ID, item.Name, item.Price, item.Quantity]; //item.ID, item.Name, item.Price, item.Quantity
        // itemDetails.push(item.ID, item.N);
        console.log(item.ID);
        orderItems.push(itemDetails);
    }

    console.log(JSON.stringify({lol : orderItems}));
    
    $.ajax({
        url: "http://localhost:5000/order", // the endpoint
        type: "POST", // http method
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: JSON.stringify(orderItems), // data sent with the post request
        // handle a successful response
        success: function (json) {
            $('#post-text').val(''); // remove the value from the input
            console.log(json); // log the returned json to the console
            console.log("success"); // another sanity check
        },

        // handle a non-successful response
        error: function (xhr, errmsg, err) {
            $('#results').html("<div class='alert-box alert radius' data-alert>Oops! We have encountered an error: " + errmsg +
                " <a href='#' class='close'>&times;</a></div>"); // add the error to the dom
            console.log(xhr.status + ": " + xhr.responseText); // provide a bit more info about the error to the console
        }
    });
}

function Order(){
    if (window.document.cookie){
        if (window.localStorage)
	    {
            OrderAjax();
            var cart = [];
		    localStorage.setItem('cart', JSON.stringify(cart));
	    }
        showCart();
     }
    else{
        window.alert("Please log in or create a new account to complete your order.");
    }
}

//Show cart in HTML
function showCart() {
    // if (cart.length == 0) {
    //     $("#cart").css("visibility", "hidden"); // hide table that shows cart
    //     return;
    // }
    cart = [];

    cart = JSON.parse(localStorage.cart);

    $("#cart").css("visibility", "visible");
    $("#cartBody").empty();  //empty the cart
    var totalPrice = 0;

    for (var i in cart) {
        var item = cart[i];
        totalPrice += (item.Price * item.Quantity);
        var row = "<tr><td>" + item.Name + "</td><td>" +
                "€" + item.Price + ",-" + "</td><td>" + item.Quantity + "</td><td>"
                + "€" + item.Quantity * item.Price + ",-" + "</td><td>"
                + "<button onclick='deleteItem(" + i + ")'>Delete</button></td></tr>";
        $("#cartBody").append(row);
    }
    var row = "<tr><td></td><td></td><td></td><td>" + "€" + totalPrice + ",-" + "</td><td>" + "<button onclick='Order(" + i + ")'>Order</button> </td></tr>";
    $("#cartBody").append(row);
}

$(document).ready(function()
{
    if (document.location.pathname.indexOf("/cart/")) {
        showCart();
    } 
});
