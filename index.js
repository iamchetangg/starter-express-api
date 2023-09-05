const express = require("express");
var bodyParser = require("body-parser");
const app = express();
var jsonParser = bodyParser.json();
app.post("/getFrameList", jsonParser, (req, res) => {
  console.log("Just got a request!");
  var input = req.body.content;

  var newstr = input.replaceAll('"', "").split("\n\n");
  if (newstr.at(newstr.length - 1).includes("Note:")) {
    var res2 = newstr.pop();
    console.log("POPPED ELEM : " + res2);
  }
  //   console.log(newstr);
  var newList = [];

  for (var i = 0; i < newstr.length; i++) {
    var map = {};
    // newList.push(newstr[0].split("\n"));
    var newl = newstr[i].split("\n");
    // console.log(newl);
    /*  if (map["Note"] !== null) {
      return;
    } */
        console.log("0" + newl[0]+"\n");
    console.log("1" + newl[1]+"\n");
    console.log("2" + newl[2]+"\n");
    console.log("3" + newl[3]+"\n");
    map["Title"] = newl[0]
      .replaceAll(`Frame ${i + 1}`, "")
      .replaceAll("(", "")
      .replaceAll(")", "")
      .trim();
    map["Description"] = newl[1]
      .replaceAll("Description: ", "")
      .replaceAll("Description - ", "");
    map["Action"] = newl[2]
      .replaceAll("Action: ", "")
      .replaceAll("Action - ", "");
      if (newl[3].includes("Voice Over Script")) { 
        map["Voice Over Script"] = newl[3].replaceAll("Voice Over Script - ", "");
      }
    /* if (newl[4] !== undefined && !newl[4].includes("Transition")) {
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
    } */
    newList.push(map);
  }
  console.log(newList);
  return res.send(newList);
});
app.listen(process.env.PORT || 3000);
