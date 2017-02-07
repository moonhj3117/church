var express  = require("express");
var router   = express.Router();
var Sermon     = require("../models/Sermon");
var fs       = require('fs');


// Index
router.get("/", function(req, res){
  Sermon.find({Sermon_type:"1"})    // 11시 예배가 첫 화면으로 고정되어 있기에 type 을 1 던져서 데이터를 갖고 온다
  .sort("-Sermon_date")
  .exec(function(err, Sermons){
    if(err) return res.json(err);
    res.render("posts/index", {sermons:Sermons, id:1});
  });
});

// Index
router.get("/index/:id", function(req, res){
  Sermon.find({Sermon_type:req.params.id})
  .sort("-Sermon_date")
  .exec(function(err, Sermons){
    if(err) return res.json(err);
    res.render("posts/index", {sermons:Sermons, id:req.params.id});
  });
});


// New
router.get("/new", function(req, res){
  res.render("posts/admin/new");
});

// create
router.post("/", function(req, res){
  var sermon_data = new Sermon();
  sermon_data.Sermontitle = req.body.title;
  sermon_data.Sermonbody = req.body.body;
  sermon_data.file_path = "/storage/abc.mp3";
  sermon_data.Sermon_date = req.body.sermon_date;
  sermon_data.Sermon_type = req.body.selectpicker;
  switch (req.body.selectpicker) {
    case "1":
        sermon_data.Sermon_type_txt = "11시 예배";
      break;
    case "2":
        sermon_data.Sermon_type_txt = "오후 예배";
      break;
      case "3":
        sermon_data.Sermon_type_txt = "수요 예배";
      break;
  }

  Sermon.create(sermon_data, function(err, sermon){
    if(err) return res.json(err);
    res.redirect('/posts');
  });
});

// show
router.get("/:id", function(req, res){
  Sermon.findOne({_id:req.params.id}, function(err, sermon){
    if(err) return res.json(err);
    res.render("posts/show", {sermon:sermon});
  });
});

// edit
router.get("/:id/edit", function(req, res){
  Sermon.findOne({_id:req.params.id}, function(err, sermon){
    if(err) return res.json(err);
    res.render("posts/admin/edit", {sermon:sermon});
  });
});

// update
router.put("/:id", function(req, res){
  var sermon_data = new Sermon();
  sermon_data._id = req.params.id;
  sermon_data.Sermontitle = req.body.title;
  sermon_data.Sermonbody = req.body.body;
  sermon_data.file_path = "/storage/abc.mp3";
  sermon_data.Sermon_date = req.body.sermon_date;
  sermon_data.Sermon_type = req.body.selectpicker;
  switch (req.body.selectpicker) {
    case "1":
        sermon_data.Sermon_type_txt = "11시 예배";
      break;
    case "2":
        sermon_data.Sermon_type_txt = "오후 예배";
      break;
      case "3":
        sermon_data.Sermon_type_txt = "수요 예배";
      break;
  }
  Sermon.findOneAndUpdate({_id:req.params.id}, sermon_data, function(err, sermon){
    if(err) return res.json(err);
    res.redirect("/posts/"+req.params.id);
  });
});

// destroy
router.delete("/:id", function(req, res){
  Sermon.remove({_id:req.params.id}, function(err){
    if(err) return res.json(err);
    res.redirect("/posts");
  });
});

module.exports = router;
