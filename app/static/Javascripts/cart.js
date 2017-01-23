var cart = [];

//first function call when the 'Add to Cart' button is clicked
function cart_onClick(id, name, price, stock){ 
  AddToCart(id, name, price, stock); 
  popup(name, "cart");
} 

function AddToCart(id, name, price, stock) {

	//load cart data from local storage
	if (localStorage.cart){
		cart = JSON.parse(localStorage.cart);  
	}

	//store the items to the cart in the local storage item 'cart'
	if (localStorage){
		var pid = id;
		var pname = name;
		var pprice_string = price;
		var pprice = parseInt(pprice_string);
		var pquantity = 1; //can change this to dropdown value?
        var pstock = stock;

		var product = { ID : pid, Name: pname, Price: pprice, Quantity: pquantity , Stock: pstock };///
		console.log(product);
		//didnt work without the if statement on cart.length for some reason
		if (cart.length > 0){
			for(var i in cart){
				if (cart[i].Name == pname){
					cart[i].Quantity += 1;
					cart[i].Price += pprice;
					saveCart(cart);
					console.log("Item already exists"); //sanity check -canremove
					console.log(cart[i].Price);
                    console.log(cart[i].Quantity);
					return;
				}            
			}  
		}    

		console.log("Item not yet in cart"); //sanity check -canremove
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
                cart[i].Price -= (cart[i].Price / cart[i].Quantity); 
                cart[i].Quantity -= 1;                             
            }
            else{
                //delete item at index
                cart.splice(i, 1);
            }
        }      
    }
   
    saveCart(cart);
    showCart();
}

//Check the stock for every item in the cart and return a string with every item with insufficient stock for the order.
function checkStock(cart){
    return_string = "";
     for (var i in cart){
         console.log(cart[i].Stock + " = current stock");
         console.log(cart[i].Quantity);

         if (cart[i].Stock < cart[i].Quantity){
            return_string += cart[i].Name + "  "; 
         }
     }
     return return_string;
}

function OrderAjax(){
    var cart = [];
    cart_pass = true;
    var orderItems = [];
    cart = JSON.parse(localStorage.cart);
    var enough_stock = checkStock(cart);

    if (JSON.parse(localStorage.cart) != 0 && enough_stock == ""){
        for (var i in cart) {
                var item = cart[i];
                var itemDetails = [item.ID, item.Name, item.Price, item.Quantity];      
                orderItems.push(itemDetails);
        }

        console.log(JSON.stringify({lol : orderItems})); //sanity test -canremove
        
        $.ajax({
            url: "/order", // the endpoint
            type: "POST", // http method
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            data: JSON.stringify(orderItems), // data sent with the post request
            // handle a successful response -- does nothing, because of wrong return format
            success: function (json) {
            },

            // handle a non-successful response -- actually handles the succesful response
            error: function (xhr, errmsg, err) {
                $('#results').html("<div class='alert-box alert radius' data-alert>Oops! We have encountered an error: " + errmsg +
                    " <a href='#' class='close'>&times;</a></div>"); // add the error to the dom
                console.log(xhr.status + ": " + xhr.responseText); // provide a bit more info about the error to the console         
            }
        });

        return true;
    }
    
    else if(enough_stock != ""){
        document.getElementById("cart-text").innerHTML = "The following items don't have enough in stock: " + enough_stock;
        return false;
    }

    else{
        document.getElementById("cart-text").innerHTML = "Your cart is empty. Add an item to complete an order."
        return false;
    }
}

function ConfirmOrder(){
    OrderAjax();
    var cart = [];
    localStorage.setItem('cart', JSON.stringify(cart));
    $("#AlertForOrdering").remove();
    showCart();
    document.getElementById("cart-text").innerHTML = "Your order has been completed!";
}

function CancelOrder(){
    $("#AlertForOrdering").remove();
}




function Order(){
    if (window.document.cookie){
        if (window.localStorage)
	    {
	        $("#AlertForOrdering").remove();
	        //$( "<p>Test</p>" ).insertAfter( ".inner" );
	        $("#content").append("<div id='AlertForOrdering'>You are about to buy everything in your cart, <br> do you want to cont" +
                    "inue?<br> <button onclick='ConfirmOrder()' class='button'>Yes</button> <button onclick='CancelOrder()' class='button'>N" +
                    "o</button></div>");

	    }

     }
     else{
        if (JSON.parse(localStorage.cart) == 0){
            document.getElementById("cart-text").innerHTML = "Your cart is empty. Add an item to complete an order.";
        }
        else{
            document.getElementById("cart-text").innerHTML = "Please log in to complete your order.";
        }
     }
}

//Show cart in HTML
function showCart() {
    cart = [];
    if (localStorage.cart){
        cart = JSON.parse(localStorage.cart);
    }

    $("#cart").css("visibility", "visible");
    $("#cartBody").empty();  //empty the cart
    var totalPrice = 0;

    for (var i in cart) {
        var item = cart[i];
        itemprice = item.Price / item.Quantity;
        totalPrice += (itemprice * item.Quantity);
        totalItemPrice = (itemprice * item.Quantity);

        var row = "<tr><td>" + item.Name + "</td><td>" +
                "€" + itemprice + ",-" + "</td><td>" + item.Quantity + "</td><td>"
                + "€" + totalItemPrice + ",-" + "</td><td>"
                + "<button class='button' onclick='deleteItem(" + i + ")'>Delete</button></td></tr>";
        $("#cartBody").append(row);
    }
    var row = "<tr><td></td><td></td><td></td><td>" + "€" + totalPrice + ",-" + "</td><td>" + "<button style=' width: 80.5px;' class='button' onclick='Order(" + i + ")'>Order</button> </td></tr>";
    $("#cartBody").append(row);
}

$(document).ready(function()
{
    if(window.location.href.indexOf("cart") > -1) {
        showCart();
    }
});
