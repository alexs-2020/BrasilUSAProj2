mapboxgl.accessToken = 'pk.eyJ1IjoidXNhbW9ua2V5YnJhc2lsIiwiYSI6ImNsNTd6MGFzczF5NWEza3BwcTczdzJwMXcifQ.1MZ55KFPsj0qnTPB_Lg9Jg';
  var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v11'
  })
  map.on('click', addSpot)
  

axios.get("/locations")
  .then(responseFromApi => {
let cords = responseFromApi.data.locationList
    cords.forEach(exactCoords => {
      console.log(exactCoords.location.lat)
        const marker = new mapboxgl.Marker() // initialize a new marker
        .setLngLat([exactCoords.location.long, exactCoords.location.lat]) // Marker [lng, lat] coordinates
        .addTo(map);
     })
    }
  ) 
  .catch(error => console.log(error))

function addSpot(event){
  const marker = new mapboxgl.Marker() // initialize a new marker
  .setLngLat(event.lngLat) // Marker [lng, lat] coordinates
  .addTo(map);
  console.log(event.lngLat.lng)
  document.getElementById('long').value = event.lngLat.lng
  document.getElementById('lat').value = event.lngLat.lat
}







//    // Add the marker to the map
//    var marker = new mapboxgl.Marker({
//     draggable: true
// })
// .setLngLat([101.967, 35.431])
// .addTo(map);

// function onDragEnd() {
// var lngLat = marker.getLngLat();

// coordinates.style.display = 'block';
// coordinates.innerHTML =
//     'Longitude: ' + lngLat.lng + '<br />Latitude: ' + lngLat.lat;
// }

// marker.on('dragend', onDragEnd);
//    map.on('style.load', function() {
//     map.on('click', function(e) {
//       var coordinates = e.lngLat;
//       new mapboxgl.Popup()
//         .setLngLat(coordinates)
//         .setHTML('you clicked here: <br/>' + coordinates)
//         .addTo(map);
//     });
//   });









// // const geojson = {
// //   type: 'FeatureCollection',
// //   features: [
// //     {
// //       type: 'Feature',
// //       geometry: {
// //         type: 'Point',
// //         coordinates: [-77.032, 38.913]
// //       },
// //       properties: {
// //         title: 'Mapbox',
// //         description: 'Washington, D.C.'
// //       }
// //     },
// //     {
// //       type: 'Feature',
// //       geometry: {
// //         type: 'Point',
// //         coordinates: [-122.414, 37.776]
// //       },
// //       properties: {
// //         title: 'Mapbox',
// //         description: 'San Francisco, California'
// //       }
// //     }
// //   ]
// // };

// // for (const feature of geojson.features) {
// //   // create a HTML element for each feature
// //   const el = document.createElement('div');
// //   el.className = 'marker';

// //   // make a marker for each feature and add to the map
// //   const marker =new mapboxgl.Marker(el)
// //   .setLngLat(feature.geometry.coordinates)
// //    .setPopup(
// //     new mapboxgl.Popup({ offset: 25 }) // add popups
// //       .setHTML(
// //         `<h3>${feature.properties.title}</h3><p>${feature.properties.description}</p>`
// //       )
// //   )
// //   .addTo(map);
// // }

// const geocoder = new MapboxGeocoder({
//     accessToken: mapboxgl.accessToken, // Set the access token
//     mapboxgl: mapboxgl, // Set the mapbox-gl instance
//     marker: false, // Do not use the default marker style
    
// });

// // After the map style has loaded on the page,
// // add a source layer and default styling for a single point
// map.on('load', () => {
//   map.addSource('single-point', {
//     type: 'geojson',
//     data: {
//       type: 'FeatureCollection',
//       features: []
//     }
//   });

//   map.addLayer({
//     id: 'point',
//     source: 'single-point',
//     type: 'circle',
//     paint: {
//       'circle-radius': 10,
//       'circle-color': '#448ee4'
//     }
//   });

//   // Listen for the `result` event from the Geocoder
//   // `result` event is triggered when a user makes a selection
//   //  Add a marker at the result's coordinates
//   geocoder.on('result', (event) => {
//     map.getSource('single-point').setData(event.result.geometry);
//   });
// });

