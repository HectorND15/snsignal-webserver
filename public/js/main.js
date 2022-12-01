var map = L.map('map-template', {zoomControl: false}).setView([11.019191, -74.850951], 17.3);
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 17.8,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

var data = []
async function heatmapping(){
    const operator = document.getElementById('operatorSelect').value
    const network = document.getElementById('networkSelect').value
    console.log(operator,network)
    const response = await fetch('/heatmap', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            'operator'    : operator,
            'networkType' : network
        })
    });
    data = await response.json();
    drawHeatMap();
}

var group = L.featureGroup();


function drawHeatMap(){
    const goodSignal = document.getElementById('goodSignalRssi');
    const regularSinal = document.getElementById('regularSignalRssi');
    const poorSignal = document.getElementById('poorSignalRssi');
    const noSignal = document.getElementById('noSignalRssi');
    const network = document.getElementById('networkSelect').value
    map.removeLayer(group)
    for(let i=0; i<data.length; i++){
        if(network == '4G'){
            if(data[i].rssi > -80) {
                color = 'red'
            }
            if(data[i].rssi < -80 && data[i].rssi > -102) {
                color = 'yellow'
            }
            if(data[i].rssi < -102 && data[i].rssi > -115) {
                color = 'green'
            }
            if(data[i].rssi < -115) {
                color = 'blue'
            }
            goodSignal.innerHTML = '[ > -80 dbm]';
            regularSinal.innerHTML = '[ -80 a  -102 dbm]';
            poorSignal.innerHTML = '[ -102 a  -115 dbm]';
            noSignal.innerHTML = '[ < -115 dbm]';

        } else if(network == '3G'){
            if(data[i].rssi > -80) {
                color = 'red'
            }
            if(data[i].rssi < -80 && data[i].rssi >= -90) {
                color = 'yellow'
            }
            if(data[i].rssi < -90 && data[i].rssi >= -98) {
                color = 'green'
            }
            if(data[i].rssi < -98) {
                color = 'blue'
            }
            goodSignal.innerHTML = '[ > -80 dbm]';
            regularSinal.innerHTML = '[ -80 a  -90 dbm]';
            poorSignal.innerHTML = '[ -90 a  -98 dbm]';
            noSignal.innerHTML = '[ < -98 dbm]';
        }

        circle = new L.circle([data[i].latitude, data[i].longitude], {
            color: color,
            fillColor: color,
            fillOpacity: 1,
            radius: 12
        }).addTo(group)
        map.addLayer(group)
        circle.bindPopup('RSSI:'+ data[i].rssi)
    }
}
