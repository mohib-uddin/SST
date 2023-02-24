const mongoose=require('mongoose');

const StudentSchema=new mongoose.Schema({

    Name:{type:String,required:'true'},
    FeeStatus:{type:Boolean,required:'true',default:false},
    Fee:{type:Number,required:'true'},
    Balance:{type:Number,required:'true'},
    Contact:{type:String,required:'true'},
    Batch:{type:String,required:'true'},
    FatherContact:{type:String},
    Tests:[
        /*{
            type:mongoose.Schema.Types.ObjectId,
           ref:"Test"
        }*/
    ]
},{timestamps:true})

mongoose.models={}
export default mongoose.model("Student",StudentSchema)