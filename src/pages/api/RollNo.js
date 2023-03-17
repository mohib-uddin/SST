import connectDb from "middleware/mongoose"
import Students from "models/Students"
import Tests from "models/Tests"



const handler=async(req,res)=>{


   /*let StudentByBatch=await Students.find({Batch:"IX"});
    res.status(200).json({StudentByBatch})*/
   
 
   
        let students=await Students.find();

        if(students)
        {
            students.map(async(e,index)=>{
                if(e.Batch=='IX')
                {
                    let i=index+1
                    let doc = await Students.findOneAndUpdate({Name:e.Name}, {RollNo:e.Batch+'-'+i}, {
                        new: true
                      });
                     res.status(200).json({Message:'Updated'})
                }
            })
    
            students.map(async(e,index)=>{
                if(e.Batch=='X')
                {
                    let i=index+1
                    let doc = await Students.findOneAndUpdate({Name:e.Name}, {RollNo:e.Batch+'-'+i}, {
                        new: true
                      });
                     res.status(200).json({Message:'Updated'})
                }
            })
    
            students.map(async(e,index)=>{
                if(e.Batch=='XI')
                {
                    let i=index+1
                    let doc = await Students.findOneAndUpdate({Name:e.Name}, {RollNo:e.Batch+'-'+i}, {
                        new: true
                      });
                     res.status(200).json({Message:'Updated'})
                }
            })
    
            students.map(async(e,index)=>{
                if(e.Batch=='XII')
                {
                    let i=index+1
                    let doc = await Students.findOneAndUpdate({Name:e.Name}, {RollNo:e.Batch+'-'+i}, {
                        new: true
                      });
                     res.status(200).json({Message:'Updated'})
                }
            })
    
        }

       
       
    



}


export default connectDb(handler)