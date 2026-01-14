import mongoose from "mongoose";
import bcrypt from "bcryptjs";

mongoose.connect(process.env.MONGO_URI);

const User = mongoose.models.User || mongoose.model("User", { email:String, password:String, role:String });

export default async function handler(req, res){
  if(req.method!=='POST') return res.status(405).end();
  const hash = await bcrypt.hash(req.body.password,10);
  await User.create({email:req.body.email,password:hash,role:'user'});
  res.status(201).json({message:'User registered'});
}
