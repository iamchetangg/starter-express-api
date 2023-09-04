const express = require("express");
var bodyParser = require("body-parser");
const app = express();
var jsonParser = bodyParser.json();
app.all("/getFrameList", jsonParser, (req, res) => {
  console.log("Just got a request!");
  var input = req.body.content;

  var newstr = input.replaceAll('"', "").split("\n\n");
  var list = ["s"];
  if (newstr.at(newstr.length - 1).includes("Note:")) {
    var res = newstr.pop();
    console.log("POPPED ELEM : " + res);
  }

  var newList = [];
  for (var i = 0; i < newstr.length; i++) {
    var map = {};
    // newList.push(newstr[0].split("\n"));
    var newl = newstr[i].split("\n");
    console.log(newl);
    /*  if (map["Note"] !== null) {
      return;
    } */
    map["Title"] = newl[1].replaceAll("Title: ", "");
    map["Description"] = newl[2].replaceAll("Description: ", "");
    map["Suitable Camera action"] = newl[3].replaceAll(
      "Suitable Camera action: ",
      ""
    );
    if (newl[4] !== undefined && !newl[4].includes("Transition")) {
      map["Brief Voice over Script"] = newl[4].replaceAll(
        "Brief Voice over Script: ",
        ""
      );
    } else if (newl[4] !== undefined && newl[4].includes("Transition")) {
      map["Suitable Transition"] = newl[4].replaceAll(
        "Suitable Transition: ",
        ""
      );
    }
    if (newl[5] !== undefined) {
      //   console.log(i.toString() + " TR NOT UNDEFINED" + newl[5].toString());
      map["Suitable Transition"] = newl[5].replaceAll(
        "Suitable Transition: ",
        ""
      );
    }
    newList.push(map);
  }

  console.log(newList);
  res.send(newList);
});
app.listen(process.env.PORT || 3000);
