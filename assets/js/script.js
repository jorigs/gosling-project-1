function sideOpen() {
    document.getElementById("mySidebar").style.display = "block";
    document.getElementById("myOverlay").style.display = "block";
}

function sideClose() {
    document.getElementById("mySidebar").style.display = "none";
    document.getElementById("myOverlay").style.display = "none";
}

$("#continue").on("click", function () {
    $("#locationBox").addClass('animated bounceOutDown')
    $("#firstOverlay").slideUp(1500);

})

$("#homeButton").on("click", function () {
    $("#home").show();
    $("#howTo").hide();
    $("#contact").hide();
});

$("#howToButton").on("click", function () {
    $("#home").hide();
    $("#howTo").show();
    $("#contact").hide();
});

$("#contactButton").on("click", function () {
    $("#home").hide();
    $("#howTo").hide();
    $("#contact").show();
});

$("#howTo").hide();
$("#contact").hide();
$("#continue").prop("disabled", true);

$("#inputField").on("keyup", function () {
    $("#continue").prop("disabled", false);
    if ($("#inputField").val() == '') {
        $("#continue").prop("disabled", true);
    }
});




var markersArray = [];
var geocoder;
var map;
var pyrmont = {
        lat: -33.867,
        lng: 151.195
    };

var request = {
    location: pyrmont,
    radius: '5000',
    types: []
  };



function initialize() {

    map = new google.maps.Map(document.getElementById('googlemaps'), {
        zoom: 13,
        center: new google.maps.LatLng(10, 10)
    });

    geocoder = new google.maps.Geocoder();

    // Set focus to address field
    document.getElementById('inputField').focus();

    // Bind click event listener for search button
    document.getElementById("continue").addEventListener('click', codeAddress, false);

    // Bind key-up event listener for address field
    document.getElementById("inputField").addEventListener('keyup', function (event) {

        // Check the event key code
        if (event.keyCode == 13) {

            // Key code 13 == Enter key was pressed (and released)
            codeAddress();
            
        }
    });
}

function codeAddress() {

    var address = document.getElementById("inputField").value;

    geocoder.geocode({
        'address': address,
    }, function (results, status) {

        if (status == google.maps.GeocoderStatus.OK) {

            map.setCenter(results[0].geometry.location);

           pyrmont.lng = results[0].geometry.bounds["b"].b;
           pyrmont.lat = results[0].geometry.bounds["f"].b;
console.log(pyrmont)
            var marker = new google.maps.Marker({
                map: map,
                position: results[0].geometry.location
                
            
            
            });
            places();
console.log(pyrmont)

            
        } else {
            alert("Geocode was not successful for the following reason: " + status);
        }
    });
    console.log('running21')
    
}

document.body.onload = initialize();


function places(){
var service = new google.maps.places.PlacesService(map);
  service.nearbySearch(request, function(results, status) {
    if (status == google.maps.places.PlacesServiceStatus.OK) {
      for (var i = 0; i < results.length; i++) {
        var place = results[i];
          
          console.log(place);
        // If the request succeeds, draw the place location on
        // the map as a marker, and register an event to handle a
        // click on the marker.
        var marker = new google.maps.Marker({
          map: map,
          position: place.geometry.location
        });
        markersArray.push(marker);
		google.maps.event.addListener(marker,"click",function(){});
      }
      console.log(markersArray)
    }
  });
  
}

function clearMarkers() {
  for (var i = 0; i < markersArray.length; i++ ) {
    markersArray[i].setMap(null);
  }
  markersArray.length = 0;
}


$("#filterLibrary").on('click', function(){
	clearMarkers()
    request.types = ['library']
    codeAddress();
})

$("#filterCafe").on('click', function(){
	clearMarkers()
    request.types = ['cafe']
    places();
})

$("#filterBoth").on('click', function(){
	clearMarkers()
    request.types = ['cafe', 'library']
    places();
})


/*
//setting a global traffic layer to toggle on and off at user's discretion
    trafficLayer = new google.maps.TrafficLayer();
    $('#traffic').on('click', function(){
        
        if(!trafficSet){
            trafficLayer.setMap(map);
            trafficSet = true;
        } 
        else {
            trafficLayer.setMap(null);
            trafficSet = false;
        }
        
    });
*/



 // Initialize Firebase
    var config = {
      apiKey: "AIzaSyBN1V4dWNy6tuNM5C13vtllZwyh6968coY",
      authDomain: "please-fucking-work.firebaseapp.com",
      databaseURL: "https://please-fucking-work.firebaseio.com",
      projectId: "please-fucking-work",
      storageBucket: "",
      messagingSenderId: "268510564489"
    };
    firebase.initializeApp(config);

    var bigOne = document.getElementById('bigOne');
    var dbRef = firebase.database().ref().child('text');
    //dbRef.on('value', snap => bigOne.innerText = snap.val());

    function hideLogin() {
      document.getElementById('firebaseui-auth-container').style.display = "none";
    }
/*
    function showWelcome() {
      document.getElementById('secondOverlay').style.display = "block";
    }
*/
    // FirebaseUI config.
    var uiConfig = {
      signInSuccessUrl: 'index.html',
      signInOptions: [
        // Leave the lines as is for the providers you want to offer your users.
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        //firebase.auth.FacebookAuthProvider.PROVIDER_ID,
        //firebase.auth.TwitterAuthProvider.PROVIDER_ID,
        //firebase.auth.GithubAuthProvider.PROVIDER_ID,
        firebase.auth.EmailAuthProvider.PROVIDER_ID,
        //firebase.auth.PhoneAuthProvider.PROVIDER_ID
      ],
      // Terms of service url.
      tosUrl: '<your-tos-url>'
    };

    // Initialize the FirebaseUI Widget using Firebase.
    var ui = new firebaseui.auth.AuthUI(firebase.auth());
    // The start method will wait until the DOM is loaded.
    ui.start('#firebaseui-auth-container', uiConfig);

    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        // User is signed in.

        hideLogin();
       // showWelcome();

        var displayName = user.displayName;
        var email = user.email;
        var emailVerified = user.emailVerified;
        var photoURL = user.photoURL;
        var uid = user.uid;
        var phoneNumber = user.phoneNumber;
        var providerData = user.providerData;
        user.getIdToken().then(function (accessToken) {
          //document.getElementById('sign-in-status').textContent = 'Signed in';
          //document.getElementById('sign-in').textContent = 'Sign out';
          /*document.getElementById('account-details').textContent = JSON.stringify({
            displayName: displayName,
            email: email,
            emailVerified: emailVerified,
            phoneNumber: phoneNumber,
            photoURL: photoURL,
            uid: uid,
            accessToken: accessToken,
            providerData: providerData
          }, null, '  ');*/
        });
      } else {
        // User is signed out.
        //document.getElementById('sign-in-status').textContent = 'Signed out';
        //document.getElementById('sign-in').textContent = 'Sign in';
        //document.getElementById('account-details').textContent = 'null';
      }
    }, function (error) {
      console.log(error);
    });