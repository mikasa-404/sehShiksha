import mongoose from "mongoose";
const ReplySchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Reference to the User model
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
    questionID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Question", // Reference to the Question model
      required: true,
    },
    replyId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Reply", // For nested replies, reference to the parent reply
    },
    content: {
      type: String,
      required: true,
    },
    replies: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Reply", // Reference to the Reply model
      },
    ],
  },
  { timestamps: true }
);
const Reply= mongoose.model("reply", ReplySchema);
export default Reply;
