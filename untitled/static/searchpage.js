$(document).ready(function(){

$("#search").on("click", function(event){
    event.preventDefault();
    SearchItems();
});

$("#search_input").keypress(function(event){
    if(event.which == 13){
        event.preventDefault();
        SearchItems();
    }
})

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
    $.ajaxSetup({async:false});
    var searchbarvalue = $("#search_input").val();
    var classification = "Mammal";
    var continent = "Africa";
    var minprice = 0;
    var maxprice = 10000;

    var address = ReadyItemArguments(searchbarvalue, classification, continent, minprice, maxprice);
    var valuestemp = "";

    $.getJSON(address, function(data){
        data = [].concat( data );
        console.log("read json");
        data.forEach(function(value, index, array){
            console.log("One value read");
            valuestemp += value.name;
            console.log(valuestemp);
            }
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
    $.ajaxSetup({async:true});
    console.log(valuestemp);
    valuestemp += " Afsluitende string"
    PageHTML = valuestemp;
    $("#ChangeablePage").html(PageHTML);
}

function ReadyItemArguments(name, classification, continent, minprice, maxprice){
    var address = "items?"
    if(name != null){
        address += "name=" + name;
    }

    if(classification != null){
        address+= "&class=" + classification;
    }

    if(continent != null){
        continent = [].concat(continent);
        address += "&werelddeel="
        continent.forEach(function(value, index, array){
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
    address.replace(" ", "%20");
    return address;
}














});
