// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import Students from "models/Students";
import connectDb from "middleware/mongoose";

const handler=async (req, res)=>{



   switch(req.method)
   {
      case "POST":
      {
         let Student=new Students({

            Name:req.body.Name,
            FeeStatus:req.body.FeeStatus,
            Fee:req.body.Fee,
            Balance:req.body.Balance,
            Contact:req.body.Contact,
            Batch:req.body.Batch,
            Major:req.body.Major,
            FatherContact:req.body.FatherContact,
            Tests:[],
      
           });
           await Student.save();
           break;
      }

      case "GET":
      {
         let students=await Students.find()
         res.status(200).json({students})
         break;
      }

      case "DELETE":
         {
            Students.deleteOne({Name: req.body.Name }, function (err) {
               if (err) return handleError(err);
               // deleted at most one tank document
             });
             
           res.status(200).json({Message:'Deleted'})
           break;
         }

      case "PUT":
      {
         let doc = await Students.findOneAndUpdate(req.body.id, req.body.items, {
            new: true
          });
         res.status(200).json({Message:'Deleted'})
         break;
      }

      default:{
         res.status(400).json({error:'Bad Request'})
         break;
      }




   }

}

export default connectDb(handler);
