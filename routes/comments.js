var express=require("express");
var router=express.Router({mergeParams:true});
var States=require("../models/state");
var Destination=require("../models/destination");
var Comments=require("../models/comment");
var User=require("../models/user");


// comments routes
router.get("/new", isLoggedIn, function(req,res){
	States.findById(req.params.id,function(err,state){
		if(err){
			console.log(err);
		}else{
			Destination.findById(req.params.destination_id,function(err,destination){
				if(err){
					console.log(err);
				}else{
					res.render("comments/new",{state:state, destination:destination});
				}
			});
		}
	});
});

router.post("/", isLoggedIn, function(req,res){
	States.findById(req.params.id,function(err,state){
		if(err){
			console.log(err);
		}else{
			Destination.findById(req.params.destination_id,function(err,destination){
				if(err){
					consloe.log(err);
				}else{
					Comments.create(req.body.comment,function(err,comment){
						if(err){
							console.log(err);
						}else{
						//	console.log(req.user.username);
						//	console.log(comment);
							comment.author.id=req.user._id;
							comment.author.username=req.user.username;
							comment.save();
							destination.comments.push(comment);
							destination.save();
						//	console.log(comment);
						//	console.log(" new comment created!");
							req.flash("success","Successfully added comment");
							res.redirect("/states/" + state._id +"/"+ destination._id);
						}
					});
				}
			});
		}
	});
});

router.delete("/:comment_id", checkUserComment ,function(req,res){

			Comments.findByIdAndRemove(req.params.comment_id,function(err){
				if(err){
					consloe.log(err);
				}
				req.flash("success","Comment removed successfully!");
				res.redirect("/states/" + req.params.id +"/"+ req.params.destination_id);
			});
});


function isLoggedIn(req,res,next){
	if(req.isAuthenticated()){
		return next();
	}
	req.flash("error","You need to be login!");
	res.redirect("/login");
}

function checkUserComment(req, res, next){
        console.log("YOU MADE IT!");
        if(req.isAuthenticated()){
            Comments.findById(req.params.comment_id, function(err, comment){
				if(err){
					console.log(err);
				}else{
					if(comment.author.id.equals(req.user._id)){
					   next();
				  	 } else {
					   req.flash("error", "You don't have permission to do that!");
					   res.redirect("/campgrounds/" + req.params.id);
				   	}
				}
			});
			
			} else {
				req.flash("error", "You need to be signed in to do that!");
				res.redirect("login");
			}
}


module.exports=router;