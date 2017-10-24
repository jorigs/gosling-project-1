
$("#menu-toggle").click(function (e) {
    e.preventDefault();
    $("#wrapper").toggleClass("toggled");
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
    types: ['library']
};



function initialize() {

    map = new google.maps.Map(document.getElementById('maps'), {
        zoom: 13,
        center: new google.maps.LatLng(35.2030728, -80.7799136)
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

            var styles = [{ "featureType": "landscape", "stylers": [{ "saturation": -100 }, { "lightness": 65 }, { "visibility": "on" }] }, { "featureType": "poi", "stylers": [{ "saturation": -100 }, { "lightness": 51 }, { "visibility": "simplified" }] }, { "featureType": "road.highway", "stylers": [{ "saturation": -100 }, { "visibility": "simplified" }] }, { "featureType": "road.arterial", "stylers": [{ "saturation": -100 }, { "lightness": 30 }, { "visibility": "on" }] }, { "featureType": "road.local", "stylers": [{ "saturation": -100 }, { "lightness": 40 }, { "visibility": "on" }] }, { "featureType": "transit", "stylers": [{ "saturation": -100 }, { "visibility": "simplified" }] }, { "featureType": "administrative.province", "stylers": [{ "visibility": "off" }] }, { "featureType": "water", "elementType": "labels", "stylers": [{ "visibility": "on" }, { "lightness": -25 }, { "saturation": -100 }] }, { "featureType": "water", "elementType": "geometry", "stylers": [{ "hue": "#ffff00" }, { "lightness": -25 }, { "saturation": -97 }] }];

            map.set('styles', styles);

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

// setting up the windows for markers on click!!!!!!
var infowindow = new google.maps.InfoWindow();

function makeInfoWindowEvent(map, infowindow, contentString, marker) {
  google.maps.event.addListener(marker, 'click', function() {
    infowindow.setContent(contentString);
    infowindow.open(map, marker);
  });
}





// function that retrieves location results for nearby interests
function places() {

    clearMarkers();
    var service = new google.maps.places.PlacesService(map);
    service.nearbySearch(request, function (results, status) {
        if (status == google.maps.places.PlacesServiceStatus.OK) {
            for (var i = 0; i < results.length; i++) {
                var place = results[i];
                console.log(request)
                console.log(place);
                // If the request succeeds, draw the place location on
                // the map as a marker, and register an event to handle a
                // click on the marker.
                var marker = new google.maps.Marker({
                    map: map,
                    position: place.geometry.location
                });


                //info window for markers
                makeInfoWindowEvent(map, infowindow, "<img src=" + place.icon + ">" + "<br><br>" + place.name + "<br>" + place.vicinity, marker);


                markersArray.push(marker);
                google.maps.event.addListener(marker, "click", function () { });
            }
            console.log(request)

        }
    });

}

function clearMarkers() {
    for (var i = 0; i < markersArray.length; i++) {
        markersArray[i].setMap(null);
    }
    markersArray.length = 0;
}
/*

$("#libraries").on('click', function () {
    clearMarkers()
    request.types.push('libraries')
    places();
    console.log(request)
})

$("#cafes").on('click', function () {
    clearMarkers()
    request.types.push('cafe')
    places();
    console.log(request)
})

$("#bookStores").on('click', function () {
    clearMarkers()
    request.types = ['book_store']
    places();
    console.log(request)
})

$("#parks").on('click', function () {
    clearMarkers()
    request.types = ['park']
    places();
    console.log(request)
})

$("#bakery").on('click', function () {
    clearMarkers()
    request.types = ['bakery']
    places();
})

$("#bars").on('click', function () {
    clearMarkers()
    request.types = ['bar']
    places();
})

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







$(".filterInput").change(function(){

        request.types = [];

        $.each($("input[name='filter']:checked"), function() {
           request.types.push($(this).val());
        });
        places();

    });

console.log(request)