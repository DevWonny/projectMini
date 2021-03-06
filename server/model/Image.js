const mongoose = require("mongoose");

const ImageSchema = mongoose.Schema({
  user: {
    _id : {type:mongoose.Types.ObjectId, required : true , index : true},
    username: { type: String, required: true },
    userId : {type : String, required : true},
  },
  public : {type:Boolean, required : true, default : false},
  key: { type: String, required: true },
  originalFileName: { type: String, required: true },

}, { timestamps: true });

module.exports = mongoose.model("image", ImageSchema);