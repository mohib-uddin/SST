import connectDb from "middleware/mongoose"
import Students from "models/Students"
import Tests from "models/Tests"



const handler=async(req,res)=>{


   /*let StudentByBatch=await Students.find({Batch:"IX"});
    res.status(200).json({StudentByBatch})*/
   
 
        let students=await Students.findOne(req.body);
        res.status(200).json({students})

    
   
   



}


export default connectDb(handler)