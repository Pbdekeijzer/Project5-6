$(document).ready(function(){

$("#search").on("click", function(event){
    event.preventDefault();
    SearchItems();
});

var PageHTML = "dummy";
function pagechangetest(){
    
    $.getJSON("items", function(data){
        data.forEach(function(value, index, array){
            stringy += value.name;
        });
    });
    $("#ChangeablePage").html(stringy);
}

function SearchItems(){
    var searchbarvalue = $("#search_input").val();
    var properties = ["haha", "lol", "drie", "vier"];
    var minprice = 0;
    var maxprice = 10000;

    var address =ReadyItemArguments(searchbarvalue, properties, minprice, maxprice);
    var valuestemp = "";
    $.getJSON(address, function(data){
        data = [].concat( data );
        data.forEach(function(value, index, array){
            valuestemp += value.name;}
            );
        })  
        .done(function() {
        console.log( "second success" );
        })
        .fail(function() {
            console.log( "error" );
        })
        .always(function() {
            console.log( "complete" );
        });
    valuestemp += " Afsluitende string"
    PageHTML = valuestemp;
    $("#ChangeablePage").html(PageHTML);
}

function ReadyItemArguments(name, properties, minprice, maxprice){
    var address = "items?"
    if(name != null){
        address += "name=" + name;
    }

    if(properties != null){
        if( typeof properties === 'string' ) {
            properties = [ properties ];
        }
        address += "&property="
        properties.forEach(function(value, index, array){
            address+= value;
            if(index != (array.length-1)){
                address+= "+";
            }
        });
    }

    if(maxprice != null){
        address+= "&maxprice=" + maxprice;
    }
    if(minprice != null){
        address+= "&minprice=" + minprice;
    }
    return address;
}














});
