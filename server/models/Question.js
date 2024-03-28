import mongoose from "mongoose";

const questionSchema = new mongoose.Schema(
  {
    userID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Reference to the User model
      required: true,
    },
    title: {
      type: String,
      required: true,
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

const Question = mongoose.model("question", questionSchema);
export default Question;
