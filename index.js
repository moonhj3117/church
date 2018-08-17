var express        = require("express");
var mongoose       = require("mongoose");
var bodyParser     = require("body-parser");
var methodOverride = require("method-override");
var app = express();


// DB setting
//mongoose.connect(process.env.MONGO_DB);
mongoose.connect("mongodb://127.0.0.1:27017/church");
var db = mongoose.connection;
db.once("open", function(){
  console.log("DB connected");
});
db.on("error", function(err){
  console.log("DB ERROR : ", err);
});
// Other settings
app.set("view engine", "ejs");
app.use(express.static(__dirname+"/public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(methodOverride("_method"));

// Routes
// home
app.use("/", require("./routes/home"));
//설교 말씀
app.use("/posts", require("./routes/posts"));
//사진
app.use("/gallery", require("./routes/gallery"));


// Port setting
app.listen(3000, function(){
  console.log("server on! port 3000");
});
