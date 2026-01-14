import mongoose from "mongoose";

mongoose.connect(process.env.MONGO_URI);

const Product = mongoose.models.Product || mongoose.model(
  "Product",
  { name: String, price: Number }
);

export default async function handler(req, res) {
  if (req.method === "GET") {
    const products = await Product.find();
    return res.status(200).json(products);
  }

  if (req.method === "POST") {
    const product = await Product.create(req.body);
    return res.status(201).json(product);
  }
}
