import { Post } from "../model/postModal.js";

export const addPost = async (req, res, next) => {
  try {
    const { user_id } = req.params;

    if (!user_id) {
      return res.status(401).json({ error: "ID required" });
    }

    const { image, filter, caption } = req.body;
    if (!image) {
      return res.status(400).json({ error: "Please provide all required fields" });
    }

    let newPost = await Post.create({
      caption,
      image,
      filter: filter || [1.1, 0, 0, 0, 0, 0, 1.1, 0, 0, 0, 0, 0, 1.2, 0, 0, 0, 0, 0, 1, 0],
      user_id,
    });

    res.status(201).json(newPost);
  } catch (error) {
    next(error);
  }
};

export const getPost = async (req, res, next) => {
  try {
    let allPosts = await Post.find()
      .populate('user_id', 'username fullName')
      .sort({ createdAt: -1 });
    res.json(allPosts);
  } catch (error) {
    next(error);
  }
};

export const addComment = async (req, res, next) => {
  try {
    const { user_id, post_id } = req.params;
    const { comment } = req.body;

    if (!comment) {
      return res.status(400).json({ error: "Comment is required" });
    }

    // find the relevant post
    const findPost = await Post.findById(post_id);

    if (!findPost) {
      return res.status(404).json({ error: "Post not found" });
    }

    findPost.comment.push({
      comment,
      user_id,
      timestamps: Date.now()
    });

    await findPost.save();
    await findPost.populate('user_id', 'username fullName');
    res.json(findPost);
  } catch (error) {
    next(error);
  }
};

export const addLikes = async (req, res, next) => {
  try {
    const { user_id, post_id } = req.params;
    const findPost = await Post.findById(post_id);

    if (!findPost) {
      return res.status(404).json({ error: "Post not found" });
    }

    if (findPost.likes.includes(user_id)) {
      findPost.likes.pull(user_id);
    } else {
      findPost.likes.push(user_id);
    }

    await findPost.save();
    await findPost.populate('user_id', 'username fullName');
    res.json(findPost);
  } catch (error) {
    next(error);
  }
};

export const relaventPosts = async (req, res, next) => {
  try {
    const { id } = req.params;
    const myPost = await Post.find({ user_id: id })
      .populate('user_id', 'username fullName')
      .sort({ createdAt: -1 });
    res.json(myPost);
  } catch (error) {
    next(error);
  }
};