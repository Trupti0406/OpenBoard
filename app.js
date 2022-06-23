const express = require("express") // access
const socket = require("socket.io");

const app = express() //initialized and server ready

app.use(express.static("public"))

let port = 3000;
let server = app.listen(port, ()=>{
    console.log("Listening to port"+ port)
})

let io = socket(server); 

io.on("connection",(socket)=>{
    console.log("Made Socket Connection")
})