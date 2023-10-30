const mongoose=require('mongoose');
const Schema = mongoose.Schema;

const BrandName = new Schema({
  brandName: {
    type:String,
    required: true
  },
  data:{
    type:Date,
    default:Date.now()
  }
});

module.exports =mongoose.model("brandName",BrandName );