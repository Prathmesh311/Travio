var mongoose=require("mongoose");

var destinationSchema= new mongoose.Schema({
	name:String,
	image:String,
	des:String,
	description:String,
	video:String,
	comments:[
		{
			type:mongoose.Schema.Types.ObjectId,
			ref:"comment"
		}
	]
});

module.exports=mongoose.model("destination", destinationSchema);