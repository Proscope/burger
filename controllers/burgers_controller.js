var express = require("express");

var router = express.Router();
var burger = require("../models/burger.js");

// making a get route to the index
router.get("/", function(req, res) {
  res.redirect("/burgers");
});

router.get("/burgers", function(req, res) {
    burger.all(function(burgerData) {
    res.render("index", { burger_data: burgerData });
  });
});

// making a post route that redirects back to the index
router.post("/burgers/create", function(req, res) {
  // adding a new burger
  burger.create(req.body.burger_name, function(result) {
    console.log(result);
    res.redirect("/");
  });
});

// making a route to update the burger then redirecting back to the index
router.put("/burgers/update", function(req, res) {
  burger.update(req.body.burger_id, function(result) {
    console.log(result);
    res.redirect("/");
  });
});

module.exports = router;