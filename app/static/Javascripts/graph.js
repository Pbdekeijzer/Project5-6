$(document).ready(function()
{
  LoadBarTemplate();
  ClickedMonthYearSwitch();
  LoadItems();
  LoadYears();

  function LoadYears(){
    var myDate = new Date();
    var year = myDate.getFullYear();
    for(var i = year; i >= 1970; i--){
      $("#Years").append('<option value="'+i+'">'+i+'</option>');
    }
  }

  function LoadItems(){
    $.ajax({
      url: "/items"
    }).done(function(data){
      data.sort(function(a,b){
        if(a.name < b.name){
          return -1;
        }
        if(a.name > b.name){
          return 1;
        }
        return 0;
      });

      for(var i in data){
        $("#Items").append("<option value='" + data[i].id + "'>" + data[i].name + "</option>");
      }
    });
  }


  var ShowingYear = true;
  $("#SwitchYearMonth").click(function(e){
    ClickedMonthYearSwitch();
  });


  function ClickedMonthYearSwitch(){
    if(ShowingYear){
      $("#MonthButtons").css("display", "inline-block");
      $("#YearButtons").css("display", "none");
    }
    else{
      $("#MonthButtons").css("display", "none");
      $("#YearButtons").css("display", "inline-block");
    }
    ShowingYear = !ShowingYear;
  }

  var BarTemplate;
  var YAxisTemplate;
  function LoadBarTemplate(){
    $.ajax({
              url: "/static/GraphItems/GraphBar.html"
          }).done(function(data){
              BarTemplate = Handlebars.compile(data);
          });
    $.ajax({
              url: "/static/GraphItems/yAxisBar.html"
          }).done(function(data){
              YAxisTemplate = Handlebars.compile(data);
          });
  }
  
  $("#SalesOfItem").click(function(e){
    var month = $("#MonthMenu option:selected").text();
    var monthval = $("#MonthMenu option:selected").val();
    var year = $("#Years option:selected").text();
    var item = $("#Items option:selected").val();

    if(ShowingYear){
      $.ajax({
        url: "/stats?id=" + item + "&year=" + year
      }).done(function(data){
        var title = "Sales of " + $("#Items option:selected").text() + " in " + year;
        BuildGraph(title ,data, true, undefined, undefined, "Months");
      });
    }
    else{
      $.ajax({
        url: "/stats?id=" + item + "&year=" + year + "&month=" + monthval
      }).done(function(data){
        var title = "Sales of " + $("#Items option:selected").text() + " in " + month + " of " + year;
        BuildGraph(title ,data, false, undefined, undefined, "Days");
      });
    }

  })

  $("#Turnover").click(function(e){
    var month = $("#MonthMenu option:selected").text();
    var monthval = $("#MonthMenu option:selected").val();
    var year = $("#Years option:selected").text();

    if(ShowingYear){
      $.ajax({
        url: "/stats?turnover=true&year=" + year
      }).done(function(data){
        var title = "Turnover in " + year;
        BuildGraph(title ,data, true, undefined, undefined, "Months");
      });
    }
    else{
      $.ajax({
        url: "/stats?turnover=true&year=" + year + "&month=" + monthval
      }).done(function(data){
        var title = "Turnover in " + month + " of " + year;
        BuildGraph(title ,data, false, undefined, undefined, "Days");
      });
    }

  })


  $("#WishlistButton").click(function(e){
    var maxItems = 10;
    $.ajax({
      url: "/stats?MaxWishlistItems=" + maxItems
    }).done(function(data){
      BuildGraph("Most wished for items", data, true, 60, 20, "Items");
    })

  })

  function BuildGraph(Title, Data, DoBig, width, margins, xAxisText){
    var highest = 0;
    Data.forEach(function(element) {
      var num = element.amount;
      
      if(num > highest){
         highest = num
      }
    }, this);
    

    var Container = $("#Graph");
    var titlecontainer = $("#GraphTitle");
    titlecontainer.html(String(Title));
    Container.empty();
    if(width !== undefined & margins !== undefined){
      Container.append("<style>.GraphBar{  width: " + width + "px;  margin-left: " + margins + "px;  margin-right: " + margins + "px;}</style>")
    }
    else{
      if(DoBig){
        Container.append("<style>.GraphBar{  width: 40px;  margin-left: 10px;  margin-right: 10px;}</style>")
      }
      else{
        Container.append("<style>.GraphBar{  width: 20px;  margin-left: 5px;  margin-right: 5px;}</style>")
      }
    }

    //axis graph
    $("#XAxisText").empty();
    if(xAxisText == undefined){
      $("#XAxisText").append("<p style='color: red'>No name found, please report to the admin</p>");
    }
    else{
      $("#XAxisText").append(xAxisText);
    }

var yaxiscontext = {one: (highest/10).toFixed(1), two: (highest/10 *2).toFixed(1), three: (highest/10 *3).toFixed(1), four: (highest/10 *4).toFixed(1), five: (highest/10 *5).toFixed(1), 
six: (highest/10 *6).toFixed(1), seven: (highest/10 *7).toFixed(1), eight: (highest/10 *8).toFixed(1), nine: (highest/10 *9).toFixed(1), ten: highest };

    Container.append(YAxisTemplate(yaxiscontext));

    var textwidth = $("#HighersNumberGraphAxis").width();



    Data.forEach(function(element) {
      var bar = BuildBar(element.amount, highest, element.xAxis);
      Container.append(bar);
    }, this);

    var graphwidth = Container.width();
    $( ".BlackStripe" ).css( "width", graphwidth );
    
    $("#YGraphBar").css("width", textwidth);
  }

  function BuildBar(NumericValue, MaxValue, xAxis){
    if(MaxValue == 0){
      height = 0;
    }
    else{
    var height = Math.round( NumericValue/MaxValue * 100);
    }
    var inverseHeight = 100-height;
    var numValue = String(xAxis) + " : " + String(NumericValue);
    var context = {NumericValue: numValue, InverseHeight: inverseHeight, Height: height, Date: xAxis};
    return BarTemplate(context);
    };




});

