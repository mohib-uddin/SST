const mongoose=require('mongoose');

const UserSchema=new mongoose.Schema({

    Username:{type:String,required:'true'},
    Name:{type:Boolean,required:'true',default:false},
    Password:{type:Number,required:'true'},

},{timestamps:true})

mongoose.models={}
export default mongoose.model("User",UserSchema)