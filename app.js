var express= require("express");
var app=express();
var bodyParser=require("body-parser");
var mongoose=require("mongoose");
var methodOverride=require("method-override");
var passport=require("passport");
var LocalStrategy=require("passport-local");
var flash=require("connect-flash");
var States=require("./models/state");
var Destination=require("./models/destination");
var Comments=require("./models/comment");
var User=require("./models/user");
var seedDB=require("./seeds");

var stateRoutes=require("./routes/states");
var destinationRoutes=require("./routes/destinations");
var commentRoutes=require("./routes/comments");
var indexRoutes=require("./routes/index");

//mongoose.connect("mongodb://localhost:27017/Trivio",{useNewUrlParser: true,  useUnifiedTopology: true
				//										,useFindAndModify: false, useCreateIndex: true});


mongoose.connect(process.env.DATABASEURL ,{useNewUrlParser: true,  useUnifiedTopology: true
									,useFindAndModify: false, useCreateIndex: true});

app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash());

app.use(require("express-session")({
    secret: "Once again web development project!",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req,res,next){
	res.locals.currentUser= req.user;
	res.locals.error= req.flash("error");
	res.locals.success=req.flash("success");
	next();
});
	
//seedDB();  //seed database

/*app.listen(3000,function(){
	console.log("Travio server started!");
});*/


app.use("/",indexRoutes);
app.use("/states",stateRoutes);
app.use("/states/:id",destinationRoutes);
app.use("/states/:id/:destination_id",commentRoutes);


app.listen(process.env.PORT || 3000, process.env.IP, function(){
	console.log("Travio server stated!");
});
