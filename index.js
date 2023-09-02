const express = require('express')
const app = express()
app.all('/getFrameList', (req, res) => {
    console.log("Just got a request!")
    var input = JSON.decode(req.body)["content"];

var newstr= input.replaceAll("\"","").split("\n\n");
var newList=[];
for(var i=0; i<newstr.length; i++){
  var map ={};
 // newList.push(newstr[0].split("\n"));
 var newl = newstr[i].split("\n");
 map["Title"]=newl[1].replaceAll("Title: ","");
 map["Description"]=newl[2].replaceAll("Description: ","");
 map["Brief Voice over Script"]=newl[3].replaceAll("Brief Voice over Script: ","");
 map["Suitable Camera action"]=newl[4].replaceAll("Suitable Camera action: ","");
 map["Suitable Transition"]=newl[5].replaceAll("Suitable Transition: ","");
 newList.push(map);
}

console.log(newList);
    res.send(newList)
})
app.listen(process.env.PORT || 3000)
