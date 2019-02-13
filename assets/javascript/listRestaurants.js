displayRestaurantsList(20, 0);
function displayRestaurantsList(numResult, offset){
$.ajax({
 
    url: "https://data.sfgov.org/resource/sipz-fjte.json",
    type: "GET",
    data: {
      "$limit" : numResult,
      "$offset" : offset,
      "$$app_token" : "LjHPv42GKlRqqjnKBW78B06jY"
    }
  }).done(function(data) {
    console.log("res1" + JSON.stringify(data));

    var tBody = $("<tbody>");
  console.log(data[0].business_name);
  for (var i = 0; i < data.length; i++) {
    let inspectionDate = data[i].inspection_date ;
    
         
     let riskCategory = data[i].risk_category ;
  
    var tRow = $("<tr>");
    var tData = $("<td>");
    var aDiv = $("<Div>");
   
    var insDate = inspectionDate.substring(0,10);
    // console.log(insDate);
    var randomDate = "02-23-1999";
    var randomFormat = "YYYY-MM-DD";
    var convertedDate = moment(insDate, randomFormat);
    var modifiesDate = convertedDate.format("MM/DD/YY") ;

    var address = data[i].business_address ;
    var mapLink = "https://maps.google.com/?q=" + address;
    aDiv.append($("<h5>").text( data[i].business_name));
    aDiv.append($("<span>").text("Location Address : " + data[i].business_address));
    aDiv.append($("<br><span>").text("Location Zip : "+ data[i].business_postal_code));
    aDiv.append($("<br><span>").text("Inspection Type : " + data[i].inspection_type));
    aDiv.append($("<br><span>").text("Inspection Date : "+ modifiesDate));
    aDiv.append($("<br><span>").text("Inspection Score : " + data[i].inspection_score));
    aDiv.append($("<br><span>").text("Risk Category : "+ data[i].risk_category));
    aDiv.append($("<br><span>").text("Violation Description : "+ data[i].violation_description));
    
   
    var aTag = $('<a>');
    aTag.attr("href" , mapLink);
    aTag.attr("target" , "_blank");
    aDiv.append($("<br>"));
    aDiv.append((aTag).text("See this address on Google Map"));
   
    // aDiv.append($("<br><a href='#' class='text-center'>").text("Add to Favorite"));

    

    tData.append(aDiv);
    tRow.append(tData);

    $("tbody" ).append(tRow); 
    
   
    }
 
  });
}

$(function() {
    $('.pagination').pagination({
        pages:100,
        displayedPages:5,
        cssStyle: 'light-theme',
        onPageClick: function (pageNumber, event) {
            console.log("page" +pageNumber);
            if(pageNumber ==1){
                index =0 ;
            }else{
            index = pageNumber*10 +1;
            }
         let   offset = pageNumber*20-20;
            $("tbody").empty();
            displayRestaurantsList(20,offset);
        }
})
});

