var express  = require("express");
var router   = express.Router();
var Gallery     = require("../models/gallery");
var fs       = require('fs');

router.get('/', function(req, res){
  res.render("gallery/Gallery_main");
});
module.exports = router;
