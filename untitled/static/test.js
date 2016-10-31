$(document).ready(function(){

    // Inserts HTML into the product template and appends the HTML in the index.
    // param = json
    function InsertProduct(json){
        $.ajax({       
            url: "http://localhost:5000/static/ProductPanel.html"
        }).done(function(data){
            var container = $("#product");
            var template = Handlebars.compile(data);
            for(var i in json){
            var context = {title: json[i].name, body: json[i].description, image: json[i].image, id: json[i].id};
            var html    = template(context);
            container.append(html);
            }
        });
    };

    function RemoveHTMLPanels(){
        $(".container").empty();
    }
    // GET JSON from URL, call insert product.
    // param = string
    function GetJSONFromUrl(param){
        $.ajax({       
            url: "http://localhost:5000/" + param,   
        }).done(function(json){
            RemoveHTMLPanels();
            InsertProduct(json);
        });     
    };

//Reads the continents checkbox
//Return: Array of continents
function checkContinent(){
    var continentList = [];
    $("input:checkbox[name=cb]:checked").each(function(){
        continentList.push($(this).val());
    })
    return continentList;
}

//Reads the classification of a product
//Return: String
function checkClass(){
    var classification = "";
    if ($("#selectMenu option:selected").text() != "All"){
        classification = $("#selectMenu option:selected").text();
    }
    return classification;
}

//Reads the price from the dropdown menu
//Return: string array, element 0 = minprice, element 1 = maxprice
function checkPrice(){
    var returnPrices = ["", ""];
    if ($("#selectPrice option:selected").text() != "Any Price"){
        var prices = $("#selectPrice option:selected").text();
        if (prices == "10000+") { 
            returnPrices[0] ="10000"; }
            
        else{
            var priceArray = prices.split("-"); 
            returnPrices[0] = priceArray[0];
            returnPrices[1] = priceArray[1];  
        }
        }
    return returnPrices;
}

function filterItems(){
    var conList = checkContinent();
    var classification = checkClass();
	var prices = checkPrice();
    SearchItems(conList, classification, prices);
}

$("#search_input").on("input", filterItems);
$("#selectMenu").change(filterItems);
$("#selectPrice").change(filterItems);
$("input:checkbox").change(filterItems);

// Function to be called to search products.
function SearchItems(continents, classification, prices){
    $.ajaxSetup({async:false});

    var searchbarvalue = $("#search_input").val();
    var address = ReadyItemArguments(searchbarvalue, classification, continents, prices[0], prices[1]);
}

//Prepares an item search string which links to a json file that containts the results
//Parameters: name: name of the product, classification: classification of the product, continents: array of continents where the the product originates, minprice: the minimum price of the product, maxprice: the maximum price of the product
function ReadyItemArguments(name, classification, continents, minprice, maxprice){
    var address = "items?"

    if(name != ""){
        address += "name=" + name;
    }

    if(classification != ""){
        if (address != "items?"){ address+= "&"; }
        address+= "class=" + classification; }
    
    if(continents.length > 0){
        if (address != "items?"){ address += "&"; }
        address += "continent="
        continents.forEach(function(value, index, array){
            address+= value;
            if(index != (array.length-1)){
                address+= "+"; //+ must become OR ||
            }
        });
    }

    if(maxprice != ""){
        address+= "&max=" + maxprice;
    }
	
    if(minprice != ""){
        address+= "&min=" + minprice;
    }
    address.replace(" ", "%20");
	GetJSONFromUrl(address);
}
	ReadyItemArguments("", "", [], "", "");
	

});