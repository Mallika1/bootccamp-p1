var businessName = " " ;
function displaySearchResult(restAddress){
   
    $.ajax({
        url: "https://data.sfgov.org/resource/sipz-fjte.json?business_address=" + restAddress,
        type: "GET",
        data: {
          "$limit" : 10,
          "$$app_token" : "LjHPv42GKlRqqjnKBW78B06jY"
        }
    }).done(function(data) {
      $(".searchResult").empty();
      console.log(data);
     var  temp_arr = [] ;
      for (var i = 0; i < data.length; i++) 
      { 
        var currentName = data[i].business_name ;
        
           if(currentName !=" " && temp_arr.indexOf(currentName) == -1)
           {
            
                temp_arr[i] = currentName;
                // console.log(" temp_arr[i]" + );
           }
      }
      var uList = $("<ul class='list-group'>");
      var lList = $("<li class='list-group-item text-left'>" );
      lList.append($("<p>").text( "Search returned " +  temp_arr.length +" establishment/s"));
      $("#searchResultsWaitPanel").addClass("sr-only");
      uList.append(lList);
      for (var i = 0; i < data.length; i++) {

       currentName = data[i].business_name ;
       if(  currentName !=" " && currentName !== businessName && i>0  )
       {
        var lList = $("<li class='list-group-item text-left'>");
       
        lList.append($("<h5 style='color:teal'>").text( data[i].business_name));
        lList.append($("<h5>").text(data[i].business_address));
        lList.append($("<br>").text(data[i].risk_category));
        lList.append($("<br>").text(data[i].violation_description));
        uList.append(lList);
        businessName = data[i].business_name ;
      }else if( i==0 && currentName!=" " )
      {
        var lList = $("<li class='list-group-item text-left'>");
        lList.append($("<h5 style='color:teal'>").text( data[i].business_name));
        lList.append($("<span style='font-size:20px'>").text(data[i].business_address));
        lList.append($("<br><span style='font-size:15px'><small>").text(data[i].risk_category));
        lList.append($("<br><span style='font-size:15px'><small>").text(data[i].violation_description));
        uList.append(lList);
        businessName = data[i].business_name ;
      }
    }
      $(".searchResult").append(uList);

    })

};
let restAddress = " " ;
$("#searchBtn").on("click", function(event) {
    event.preventDefault();
     restAddress = $("#rest-input").val();
    
     if(restAddress != " " )
     {
        $("#searchResultsWaitPanel").removeClass("sr-only");
        // displaySearchResult(restAddress);
        setTimeout(displaySearchResult(restAddress), 20000);
     }
   // startSearch();
    // setInterval(nextImage, 3000);
    // displaySearchResult(restAddress);
});

