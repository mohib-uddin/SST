import connectDb from "middleware/mongoose"
import Students from "models/Students"
import Tests from "models/Tests"



const handler=async(req,res)=>{


   /*let StudentByBatch=await Students.find({Batch:"IX"});
    res.status(200).json({StudentByBatch})*/
   
 
   
        let students=await Students.findOne({Name:req.body.Name});


        let doc = await Students.findOneAndUpdate({Name:req.body.Name}, {Tests:[...students.Tests,req.body.items]}, {
            new: true
          });
         res.status(200).json({Message:'Updated'})
    



}


export default connectDb(handler)