// import Posts from "../../frontend/src/components/Posts.jsx";

import { Post } from "../model/postModal.js";

export const addPost = async (req, res) => {
  const {user_id} = req.params

  if(!user_id){
    res.status(401)
    throw new Error("ID  required")
  }
  const { image, filter, caption } = req.body;
  if (!image || !filter) {
    res.status(400);
    throw new Error("please provide all required fields");
  }


  let newPost = await Post.create({
    caption,
    image,
    filter,
    user_id,
    
  });

  res.send(newPost);
};

export const getPost = async (req, res) => {
  let allPosts = await Post.find().populate('user_id','username image ').sort({createdAt: -1})
  res.send(allPosts);
};

export const addComment = async(req, res)=>{
  const {user_id,post_id} = req.params
  const {comment} = req.body
// find the releavent post
  const findPost = await Post.findOne({_id:post_id})
  findPost.comment.push({
    comment,user_id,timestamps:Date.now()
  })
  await findPost.save();
  res.send(findPost)
}

export const addLikes = async (req,res)=>{
  const {user_id,post_id} = req.params
  const findPost = await Post.findOne({_id:post_id})

  if(findPost.likes.includes(user_id)){
    findPost.likes.pull(user_id)
  }else{
    findPost.likes.push(user_id)
  }

  await findPost.save()
  res.send(findPost)

}


export const relaventPosts = async(req,res)=>{
  const {id} = req.params
  const myPost = await Post.find({
    user_id:id
  })
  res.send(myPost)
}