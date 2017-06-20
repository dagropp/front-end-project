var express = require("express");
var app = express();

app.get("/",function(req,res){
	res.sendFile(__dirname+"/index.html")
});
app.use("/node_modules",express.static("node_modules"));
app.use("/app",express.static("app"));
app.use("/assets",express.static("assets"));

app.listen(3000);