import Post from "../models/Posts.js";
import User from "../models/User.js";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { v4 as uuidv4 } from "uuid";

import dotenv from "dotenv";
dotenv.config();

const s3 = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});
async function putObject(filename, contentType) {
  const uniqueFilename = `${uuidv4()}-${filename}`;
  const command = new PutObjectCommand({
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: `posts/${uniqueFilename}`,
    ContentType: contentType,
  });
  const url = await getSignedUrl(s3, command);
  return { url, uniqueFilename };
}

export const createPost = async (req, res) => {
  try {
    const { userId, description, picturePath, type } = req.body;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    let preSignerUrl = null;
    let postPicturePath = null;

    if (picturePath) {
      const { url, uniqueFilename } = await putObject(picturePath, type);
      preSignerUrl = url;
      postPicturePath = uniqueFilename;
    }
    const newPost = new Post({
      userId,
      firstName: user.firstName,
      lastName: user.lastName,
      userPicturePath: user.picturePath,
      description,
      picturePath: postPicturePath,
      likes: {},
      downvotes: {},
    });
    await newPost.save();
    const posts = await Post.find().sort({ createdAt: -1 });
    return res.status(201).json({
      posts,
      preSignerUrl,
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
export const getFeedPosts = async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 });
    return res.status(200).json(posts);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
export const likePosts = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req.body;
    const post = await Post.findById(id);
    const liked = post.likes.get(userId);
    if (liked) post.likes.delete(userId);
    else post.likes.set(userId, true);
    const updatedPost = await Post.findByIdAndUpdate(
      id,
      { likes: post.likes },
      { new: true }
    );
    return res.status(200).json(updatedPost);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const downPosts = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req.body;
    const post = await Post.findById(id);
    console.log(post);
    const liked = post.downvotes.get(userId);
    if (liked) post.downvotes.delete(userId);
    else post.downvotes.set(userId, true);
    const updatedPost = await Post.findByIdAndUpdate(
      id,
      { downvotes: post.downvotes },
      { new: true }
    );
    return res.status(200).json(updatedPost);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const deletePost = async (req, res) => {
  try {
    const { id } = req.params;
    const post = await Post.findById(id);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    await Post.deleteOne({ _id: id });
    return res.status(200).json({ message: "Post deleted successfully" });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
export const editPost = async (req, res) => {
  try {
    const { id } = req.params;

    const post = await Post.findById(id);
    if (!post) {
      return res.status(404).json({ message: "Post not found." });
    }
    const { description } = req.body;
    if (!description) {
      return res.status(400).json({ message: "Description is required." });
    }
    const updatedPost = await Post.findByIdAndUpdate(
      id,
      { description: description },
      { new: true }
    );
    return res.status(200).json(updatedPost);
  } catch (error) {
    res
      .status(500)
      .json({ message: "An error occurred while editing the post." });
  }
};
