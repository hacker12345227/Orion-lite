const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://localhost/orionelite');

const User = mongoose.model('User', {
  email: String,
  password: String,
  role: String
});

const Product = mongoose.model('Product', {
  name: String,
  price: Number
});

const Order = mongoose.model('Order', {
  user: String,
  items: Array,
  total: Number
});

app.post('/api/register', async (req, res) => {
  const hash = await bcrypt.hash(req.body.password, 10);
  await User.create({ email: req.body.email, password: hash, role: 'user' });
  res.sendStatus(200);
});

app.post('/api/login', async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.sendStatus(401);

  const ok = await bcrypt.compare(req.body.password, user.password);
  if (!ok) return res.sendStatus(401);

  const token = jwt.sign({ id: user._id, role: user.role }, 'SECRET');
  res.json({ token });
});

app.get('/api/products', async (req, res) => {
  res.json(await Product.find());
});

app.post('/api/products', async (req, res) => {
  await Product.create(req.body);
  res.sendStatus(200);
});

app.post('/api/orders', async (req, res) => {
  await Order.create(req.body);
  res.sendStatus(200);
});

app.listen(5000, () => console.log('Backend draait op poort 5000'));
