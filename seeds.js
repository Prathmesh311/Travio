var mongoose=require("mongoose");
var States=require("./models/state");
var Destination=require("./models/destination");
var Comments=require("./models/comment");

var data=[
	{
		name:"maharastra",
		image:"https://lh5.googleusercontent.com/p/AF1QipO0gRl7yTRQbdxlLHoQkyW7nVYHgmoe9bjZlH-9=w408-h306-k-no"
	},
	{
		name:"Rajasthan",
		image:"https://upload.wikimedia.org/wikipedia/commons/thumb/0/09/Thar_Khuri.jpg/1280px-Thar_Khuri.jpg"	
	}
];

/*function seedDB(){
	States.deleteMany({},function(err){
		if(err){
			console.log("err");
		}
		console.log("States removed!");
		Destination.deleteMany({},function(err){
			if(err){
				console.log(err);
			}
			Comments.deleteMany({},function(err){
				if(err){
					console.log(err);
				}
				console.log("destination removed");
				data.forEach(function(seed){
					States.create(seed,function(err,state){
						if(err){
							console.log(err);
						}else{
							console.log("State created");
							Destination.create(
								{
									name:"Jaipur",
									image:"https://s3.india.com/travel/wp-content/uploads/2014/09/jaipur-lead.jpg",
									description:"Jaipur is the capital of India’s Rajasthan state. It evokes the royal family that once ruled the region and that, in 1727, founded what is now called the Old City, or “Pink City” for its trademark building color. At the center of its stately street grid (notable in India) stands the opulent, colonnaded City Palace complex. With gardens, courtyards and museums, part of it is still a royal residence.",
									video:"https://www.youtube.com/embed/rdKpptxCCYw"
								},function(err,des){
									
									if(err){
										console.log(err);
									}else{
										state.destinations.push(des);
										state.save();
										Comments.create(
											{
												author:"Prathmesh",
												text:"One of the oldest historic places in the India!"
											},function(err,comment){
												console.log(comment);
												if(err){
													console.log(err);
												}else{
													des.comments.push(comment);
													des.save();
													console.log("comment created!");
												}
											});
									}
								});
						}
					});
				});
			});
		});
	});
}

module.exports= seedDB;*/