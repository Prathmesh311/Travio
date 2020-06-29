var express=require("express");
var router=express.Router();
var States=require("../models/state");
var Destination=require("../models/destination");
var Comments=require("../models/comment");
var User=require("../models/user");

//state routes
router.get("/",function(req,res){
	States.find({},function(err,states){
		if(err){
			console.log(err);
		}else{
			res.render("states/index", {states:states});
		}
	});
});

//new state formation handling routes
router.get("/new",function(req,res){
	res.render("states/new");
});

router.post("/",function(req,res){
	var newState=req.body.state;
	States.create(newState,function(err,newlycreated){
		if(err){
			console.log(err);
		
		}else{
			res.redirect("/states");
		}
	});
});

router.get("/:id",function(req,res){
	States.findById(req.params.id).populate("destinations").exec(function(err, foundState){
		if(err){
			console.log(err);
		}else{
		//	console.log(foundState);
			res.render("destinations/des",{state:foundState});
		}
	});
});

router.delete("/:id",function(req,res){
	States.findByIdAndRemove(req.params.id, function(err,state){
		if(err){
			console.log(err);
		}
		res.redirect("/states");
	});
});


module.exports= router;