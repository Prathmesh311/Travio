var mongoose= require("mongoose");

var stateSchema= new mongoose.Schema(
	{
		image: String,
		name:String,
		destinations:[
			{
				type:mongoose.Schema.Types.ObjectId,
				ref:"destination"
			}
	]
});

module.exports=mongoose.model("state",stateSchema);