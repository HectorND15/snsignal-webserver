require('dotenv').config();
const express = require('express');
const path = require('path');
const dgram = require('dgram');
const db = require("./database")

const app = express();

//setting the web server
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views' ));
app.use(express.json());

// Setting UDP Sniffer
const udp = dgram.createSocket('udp4');
const udpHost = "";
const udpPort = parseInt(process.env.UDP_PORT);

// initialization
udp.on('listening', () => {
    console.log("UDP Server:  ", udpPort);
});

let data = [0, 0, 0, 0, 0];
let networkName = ''
udp.on('message', (msg) => {
    data = msg.toString().split("\n");
    console.log(data)
    if(data[0] == 'TIGO'){
        let query = `INSERT INTO TIGO (networkType, latitude, longitude, rssi) VALUES ('${data[1].split(' ')[0]}','${data[2]}','${data[3]}','${data[4].split(' ')[0]}')`
        db.pool.query(query, function (err){
            if(err) console.log(err)
        })
    }else if(data[0] == 'Claro'){
        let query = `INSERT INTO CLARO (networkType, latitude, longitude, rssi) VALUES ('${data[1].split(' ')[0]}','${data[2]}','${data[3]}','${data[4].split(' ')[0]}')`
        db.pool.query(query, function (err){
            if(err) console.log(err)
        })
    } else{
        let query = `INSERT INTO DEFAULT (networkType, latitude, longitude, rssi) VALUES ('${data[1].split(' ')[0]}','${data[2]}','${data[3]}','${data[4].split(' ')[0]}')`
        db.pool.query(query, function (err){
            if(err) console.log(err)
        })
    }
})
udp.bind(udpPort,udpHost);


app.get("/", (req,res)=>{
    res.render('index')
})

app.post("/heatmap", (req,res) =>{
    let query = `SELECT latitude, longitude, rssi FROM ${req.body.operator} WHERE networkType = '${req.body.networkType}';`
    console.log(query)
    db.pool.query(query, function (err,rows){
        if(err) console.log(err.code)
        console.log(rows)
        res.json(rows)
    })
})

//static files
app.use(express.static( path.join(__dirname, 'public' )));

// starting the server
const port = 4000;
app.listen(port, () => {
    console.log("server on port: ",port)
});

db.connect();