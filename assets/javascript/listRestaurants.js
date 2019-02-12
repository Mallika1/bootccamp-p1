displayRestaurantsList(10, 0)
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
//   console.log(response.Array[0].business_name);
var tBody = $("<tbody>");
  console.log(data[0].business_name);
  for (var i = 0; i < data.length; i++) {
    let inspectionScore = data[i].inspection_score ;
    console.log(inspectionScore);
    // if(inspectionScore != undefined){
         
     let riskCategory = data[i].risk_category ;
    //  $(".card-body").text(data[i].business_name);
    var tRow = $("<tr>");
    var tData = $("<td>");
    var aDiv = $("<Div>");
    // var th = $("<th scope='row'>").text(index);
    aDiv.append($("<h5>").text( data[i].business_name));
    aDiv.append($("<span>").text(data[i].business_address));
    aDiv.append($("<br><small>").text("Zip: "+ data[i].business_postal_code));
    aDiv.append($("<br><small>").text("Inspection Type: " + data[i].inspection_type));
    aDiv.append($("<br><small>").text("Inspection Date: "+ data[i].inspection_date));
    aDiv.append($("<br><a href='#' class='text-center'>").text("See this address on Google Map"));
    // aDiv.append($("<br><a href='../szFavorites.html' class='text-center'>").text("Add to Favorite"));
    aDiv.append($('<br><button onclick="saveToFavorites(this.data[i].business_name)"').text("Add to Favorite"));
    

    tData.append(aDiv);
    tRow.append(tData);

    $("tbody" ).append(tRow); 
    
    // tBody.append(tRow);
    // index++;
    


  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyBpWPt-QRs0l-OEUr2wQmyoPw39EgP0qGU",
    authDomain: "project1favorites.firebaseapp.com",
    databaseURL: "https://project1favorites.firebaseio.com",
    projectId: "project1favorites",
    storageBucket: "project1favorites.appspot.com",
    messagingSenderId: "206690713544"
  };
  firebase.initializeApp(config);
  dataBaseFavorites = firebase.database();
  
  function saveToFavorites(addFavorites) {
    var favoriteObject = addFavorites;
    dataBaseFavorites.ref().push(favoriteObject);
  }
    }
   
  //}
  
  });
}