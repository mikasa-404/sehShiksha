import Post from "../models/Posts.js";
import User from "../models/User.js";
export const createPost = async (req, res) => {
  try {
    const { userId, description, picturePath } = req.body;
    const user = await User.findById(userId);
    const newPost = new Post({
      userId,
      firstName: user.firstName,
      lastName: user.lastName,
      userPicturePath: user.picturePath,
      description,
      picturePath,
      likes: {},
    });
    await newPost.save();
    const post = await Post.find().sort({ createdAt: -1 });
    return res.status(201).json(post);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
export const getFeedPosts = async (req, res) => {
  try {
    const posts = await Post.find();
    return res.status(200).json(posts);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
