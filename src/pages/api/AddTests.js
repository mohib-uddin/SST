import Tests from "models/Tests";
import connectDb from "middleware/mongoose";

const handler=async (req, res)=>{



 switch(req.method)
   {

      case "POST":
      {
      let Test=new Tests(req.body);
      await Test.save();
      }

      case "GET":
      {
         let tests=await Tests.find()
         res.status(200).json({tests})
         break;
      }

      default:
      {
         res.status(400).json({error:'Bad Request'});
      }

   }

 
}

export default connectDb(handler);
