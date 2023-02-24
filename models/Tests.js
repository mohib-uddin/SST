const mongoose=require('mongoose');

const TestSchema=new mongoose.Schema({

    Title:{type:String,required:'true'},
    Instructor:{type:String,required:'true'},
    Subject:{type:String,required:'true'},
    Date:{type:Date,required:'true'},
    Batch:{type:String,required:'true'},
    MaxMarks:{type:Number,required:'true'},

    Students:[
        /*{
           type:mongoose.Schema.Types.ObjectId,
           ref:"Student"
        }*/
    ]
},{timestamps:true})

mongoose.models={}
export default mongoose.model("Test",TestSchema)