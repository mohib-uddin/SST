import connectDb from "middleware/mongoose"
import Students from "models/Students"
import Tests from "models/Tests"



const handler=async(req,res)=>{


   /*let StudentByBatch=await Students.find({Batch:"IX"});
    res.status(200).json({StudentByBatch})*/
   let Regex=new RegExp(req.body.name);
 
    // find each person with a name contains 'Ghost'
   Students.find({ "Name" : { $regex: Regex, $options: 'i' } },
           function (err, students) {
                  if (err) return handleError(err);
                  res.status(200).json({students})

 
    });

    
   
   



}


export default connectDb(handler)