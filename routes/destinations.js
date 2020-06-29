var express=require("express");
var router=express.Router({mergeParams:true});
var States=require("../models/state");
var Destination=require("../models/destination");
var Comments=require("../models/comment");
var User=require("../models/user");


// destination routes
router.get("/new",function(req,res){
	States.findById(req.params.id,function(err,foundState){
		if(err){
			console.log(err);
		}else{
			res.render("destinations/new", {state: foundState});
		}
	});
});

router.post("/",function(req,res){
	States.findById(req.params.id,function(err,state){
		if(err){
			console.log(err);
		}else{
			Destination.create(req.body.destination,function(err,destination){
				if(err){
					console.log(err);
				}else{
					destination.save();
					//var destination=req.body.destination;
					state.destinations.push(destination);
					state.save();
					res.redirect("/states/" + state._id );
				}
			});
		}
	});
}); 

router.get("/:destination_id",function(req,res){
	States.findById(req.params.id, function(err,state){
		if(err){
			console.log(err);
		}else{
			Destination.findById(req.params.destination_id).populate("comments").exec(function(err, destination){
				if(err){
					console.log(err);
				}else{
				//	console.log(destination);
					res.render("destinations/show", {state:state, destination:destination});
				}
			});
		}
	});
});

router.delete("/:destination_id",function(req,res){
	Destination.findByIdAndRemove(req.params.destination_id,function(err,destination){
		if(err){
			console.log(err);
		}
		res.redirect("/states/" + req.params.id);
	});
});

module.exports=router;