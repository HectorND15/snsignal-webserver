var map = L.map('map-template', {zoomControl: false}).setView([11.019191, -74.850951], 17.3);
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 17.8,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

var circle

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

function drawHeatMap(){
    for(let i=0; i<data.length; i++){
        circle = L.circle([data[i].latitude, data[i].longitude], {
            color: 'red',
            fillColor: '#f03',
            fillOpacity: 1,
            radius: 8
        }).addTo(map);
        circle.bindPopup('RSSI:'+ data[i].rssi)

    }
}
