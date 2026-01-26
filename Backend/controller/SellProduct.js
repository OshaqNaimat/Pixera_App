import { Product } from "../model/productModal.js";

export const sellPost = async (req, res, next) => {
  try {
    const { user_id } = req.params;

    if (!user_id) {
      return res.status(401).json({ error: "ID required" });
    }

    const { image, title, price, description } = req.body;
    
    // Map to match schema field names
    const productImage = image;
    const productTitle = title;
    const productPrice = price;
    const productDescription = description;

    if (!productImage || !productTitle || !productPrice || !productDescription) {
      return res.status(400).json({ error: "Please fill all required fields" });
    }

    let newProduct = await Product.create({
      productImage,
      productTitle,
      productPrice,
      productDescription,
      user_id
    });

    await newProduct.populate('user_id', 'username fullName');
    res.status(201).json(newProduct);
  } catch (error) {
    next(error);
  }
};

export const getProducts = async (req, res, next) => {
  try {
    let allProducts = await Product.find()
      .populate('user_id', 'username fullName')
      .sort({ createdAt: -1 });
    res.json(allProducts);
  } catch (error) {
    next(error);
  }
};

export const relaventProducts = async (req, res, next) => {
  try {
    const { id } = req.params;
    const myProducts = await Product.find({ user_id: id })
      .populate('user_id', 'username fullName')
      .sort({ createdAt: -1 });
    res.json(myProducts);
  } catch (error) {
    next(error);
  }
};