var express=require("express");
var router=express.Router({mergeParams:true});
var passport=require("passport");
var States=require("../models/state");
var Destination=require("../models/destination");
var Comments=require("../models/comment");
var User=require("../models/user");


//index routes
router.get("/",function(req,res){
	res.render("landing");
});

router.get("/about",function(req,res){
	res.render("about");
});

// Authemntication routes
router.get("/register",function(req,res){
	res.render("register");
});

//handle sign up logic
router.post("/register", function(req, res){
    var newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password, function(err, user){
        if(err){
			console.log(err);
			req.flash("error", "Given Username is already registered");
           	return res.render("register");
        }
        passport.authenticate("local")(req, res, function(){
			console.log("you are successfully signed in!");
			req.flash("success","Welcome to Travio " + user.username);
            res.redirect("/states"); 
        });
    });
});

//login routes
router.get("/login",function(req,res){
	res.render("login");
});

router.post("/login", passport.authenticate("local", 
	{
		successRedirect:"/states",
		failureRedirect:"/login"
	}), function(req,res){
	
});

//logout route
router.get("/logout",function(req,res){
	req.logout();
	req.flash("success","You successfully Logged Out!");
	res.redirect("/states");
});
	

function isLoggedIn(req,res,next){
	if(req.isAuthenticated()){
		return next();
	}
	req.flash("error", "Please login First!");
	res.redirect("/login");
}

module.exports=router;
