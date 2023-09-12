const express = require("express");
var bodyParser = require("body-parser");
const app = express();
var jsonParser = bodyParser.json();
app.post("/getFrameList", jsonParser, (req, res) => {
  console.log("Just got a request!");
  var input = req.body.content;
  
  var decodedJSON = JSON.parse(input);
  console.log(decodedJSON);
  return decodedJSON;

});
app.listen(process.env.PORT || 3000);
