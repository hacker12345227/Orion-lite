import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

mongoose.connect(process.env.MONGO_URI);
const User = mongoose.models.User || mongoose.model("User", { email:String, password:String, role:String });

export default async function handler(req,res){
  if(req.method!=='POST') return res.status(405).end();
  const user = await User.findOne({email:req.body.email});
  if(!user) return res.status(401).end();
  const ok = await bcrypt.compare(req.body.password,user.password);
  if(!ok) return res.status(401).end();
  const token = jwt.sign({id:user._id, role:user.role}, process.env.JWT_SECRET);
  res.json({token});
}
