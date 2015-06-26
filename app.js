var express = require('express');
var app = express(); // middleware, routing
var jade = require("jade");
app.set("view engine", "jade");
app.set('views', "./");

var collection;
var MongoClient = require("mongodb").MongoClient;
var url = "mongodb://localhost:27017/node_sample";
MongoClient.connect(url, function (err, db) {
  collection = db.collection("messages");
});

var server = app.listen(3000, function () {
  console.log("running on ");
});

app.get("/", function (req, res) {
  collection.find({}).toArray(function (err, doc) {  // find all things in this collection
    var namesArray;
    if (err) {
      console.log(err);
    } else {
      namesArray = doc;
      res.render("index", {
        names: namesArray
      });
    }
  });

});

// github.com/cdelauder
