import User from "@/app/models/User";
import connectDB from "./dbConnect"

const verifyUser = async(email)=> {
  await connectDB();

  if(!email){
    console.log("Email is not passed");
    console.error("Email is not passed!");
  }
  const user = await User.findOne({email});
  if(user.verified){
    return true;
  }
  return false;
}

export default verifyUser;