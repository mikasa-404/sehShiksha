import mongoose from "mongoose";
const PostSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    userPicturePath: String,
    description: String,
    picturePath: String,
    likes: {
      type: Map,
      of: Boolean,
    },
    downvotes: {
      type: Map,
      of: Boolean,
    },
  },
  { timestamps: true }
);
//likes are mapping userid to true if they liked
const Post = mongoose.model("Post", PostSchema);
export default Post;
