// import {Products} from "../models/productModal.js";

import { Product } from "../models/productModal.js"

// export const Productsell = async (req, res) => {
//   try {
//     const { user_id } = req.params;
//     const {
//       productTitle,
//       productDescription,
//       productPrice,
//       productImage
//     } = req.body;

//     // const productImage = req.file?.path; // multer image

//     if (!productImage) {
//       return res.status(400).json({ message: "Image is required" });
//     }

//     const product = await product.create({
//       productImage,
//       productTitle,
//       productDescription,
//       productPrice,
//       user_id,
//     });

//     res.status(201).json({
//       success: true,
//       message: "Product listed successfully",
//       product,
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };


export const sellPost = async(req,res)=>{
  const {user_id} = req.params

  if(!user_id){
    res.status(401)
    throw new Error("ID required")
  }
  const {image,title,price,description} = req.body
  if(!image || !title || !price || !description){
    res.status(400);
    throw new Error("please fill all required fields")
  }


let newProduct = await Product.create({
  image,
  title,
  price,
  description
})
res.send(newProduct)
}


export const getProducts = async(req,res)=>{
  let allProducts = await Product.find().populate('user_id','username image').sort({createdAt:-1})
  res.send(allProducts)
}


export const relaventProducts = async (req,res)=>{
  const {id} = req.params
  const myProducts = await Product.find({
    user_id:id
  })
  res.send(myProducts)
}