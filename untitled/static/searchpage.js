$(document).ready(function(){

function checkedList(){
    var continentList = [];
    if($("#checkboxNA").is(":checked")){ continentList.push("North_America"); }
    if($("#checkboxSA").is(":checked")){ continentList.push("South_America"); }
    if($("#checkboxAUS").is(":checked")){ continentList.push("Australia"); }
    if($("#checkboxANTA").is(":checked")){ continentList.push("Antarctica"); }
    if($("#checkboxAFR").is(":checked")){ continentList.push("Africa"); }
    if($("#checkboxASIA").is(":checked")){ continentList.push("Asia"); }
    if($("#checkboxEU").is(":checked")){ continentList.push("Europe"); }
    return continentList;
}

// alert($("#selectMenu option:selected" ).text());

function checkClass(){
    var classification = "";
    if ($("#selectMenu option:selected").text() != "All"){
        classification = $("#selectMenu option:selected").text();
    }
    return classification;
}

$("#search").on("click", function(event){
    var conList = checkedList();
    var classification = checkClass();
    event.preventDefault();
    SearchItems(conList, classification);
});

$("#search_input").keypress(function(event){
    if(event.which == 13){
        var conList = checkedList();  
        var classification = checkClass();     
        event.preventDefault();
        SearchItems(conList, classification);
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

function SearchItems(continentlist, classification){
    $.ajaxSetup({async:false});
    var searchbarvalue = $("#search_input").val();
    var continents = continentlist; //not even needed
    var minprice = 0;
    var maxprice = 10000;

    var address = ReadyItemArguments(searchbarvalue, classification, continents, minprice, maxprice);
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

function ReadyItemArguments(name, classification, continents, minprice, maxprice){
    var address = "items?"

    if(name != null){
        address += "name=" + name;
    }

    if(classification != ""){
        address+= "&class=" + classification;
    }

    if(continents.length > 0){
        //continents = [].concat(continents); //not needed
        address += "&continent="
        continents.forEach(function(value, index, array){
            address+= value;
            if(index != (array.length-1)){
                address+= "+"; //+ must become OR ||
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
