import mongoose from "mongoose";

mongoose.connect(process.env.MONGO_URI);

const Order = mongoose.models.Order || mongoose.model("Order", { user:String, items:Array, total:Number });

export default async function handler(req,res){
  if(req.method==='POST'){
    const o = await Order.create(req.body);
    return res.status(201).json(o);
  }
  res.status(405).end();
}
