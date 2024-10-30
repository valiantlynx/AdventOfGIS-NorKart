//Initiating Leaflet map and set the view to coordinates (in WGS84 / EPSG:3857) and zoom level 13
var map = L.map("mapid").setView([58.14615, 7.99573], 13);

const apiKey = "1329BF1A-2707-4D3A-BEC2-2B4EF282F969";

L.tileLayer(
    `https://waapi.webatlas.no/maptiles/tiles/webatlas-standard-vektor/wa_grid/{z}/{x}/{y}.png?APITOKEN=${apiKey}`,
    {}
).addTo(map);



    // Legg til WMS-lag
    L.tileLayer.wms("https://openwms.statkart.no/skwms1/wms.spr_strandsoner?", {
        layers: 'spr_strandsoner_wms',
        format: 'image/png',
        transparent: true,
        attribution: '&copy; <a href="https://www.statkart.no">Statens Kartverk</a>'
    }).addTo(map);

    // Funksjon for å lage CircleMarker og legge til popup for hver feature
    function onEachFeature(feature, layer) {
            layer.bindPopup(`
                <b>Navn:</b> ${feature.properties.adm0name} - ${feature.properties.name}<br>
                <b>Land:</b> ${feature.properties.sov0name}<br>
                <b>Populasjon:</b> ${feature.properties.pop_max}
            `);
    }

    // Stilinnstillinger for CircleMarkers
    function styleFeature(feature) {
        return {
            radius: 5,
            color: 'green',
            fillColor: 'red',
            fillOpacity: 0.6
        };
    }

    // Laste inn GeoJSON-data med fetch og legge til som lag
    fetch('https://adventofgis-data.ams3.digitaloceanspaces.com/ne_10m_populated_places_simple.geojson')
        .then(response => response.json())
        .then(data => {
            // Legger GeoJSON-data til kartet som CircleMarkers
            L.geoJSON(data, {
                pointToLayer: function(feature, latlng) {
                    return L.circleMarker(latlng, styleFeature(feature));
                },
                onEachFeature: onEachFeature
            }).addTo(map);
        })
        .catch(error => console.error('Kunne ikke laste GeoJSON-data:', error));

/*
        // Variabel for å lagre brukerens posisjon-marker
        let userMarker = null;

        // Funksjon for å oppdatere brukerens posisjon
        function updateUserPosition(position) {
            const { latitude, longitude } = position.coords;
            
            // Hvis markør allerede finnes, oppdater posisjonen, ellers opprett ny
            if (userMarker) {
                userMarker.setLatLng([latitude, longitude]);
            } else {
                userMarker = L.circleMarker([latitude, longitude], {
                    radius: 10,
                    color: 'blue',
                    fillColor: 'blue',
                    fillOpacity: 0.6
                }).addTo(map).bindPopup("Du er her");
                map.setView([latitude, longitude], 12);
            }
        }

        // Sette opp geolokasjon som oppdateres hvert 5. sekund
        if ("geolocation" in navigator) {
            navigator.geolocation.watchPosition(updateUserPosition, 
                error => console.error('Kunne ikke hente GPS-posisjon:', error), 
                { enableHighAccuracy: true, maximumAge: 5000, timeout: 15000 });
        } else {
            console.error("Geolokasjon støttes ikke av denne nettleseren.");
        }
*/
