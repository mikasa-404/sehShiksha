import Question from "../models/Question.js";
import User from "../models/User.js";
import Reply from "../models/Reply.js";

export const postReply = async (req, res) => {
  try {
    const quesId = req.params.quesId;
    const { userId, content } = req.body;
    const user = await User.findById(userId);
    const newReply = new Reply({
      userId,
      firstName: user.firstName,
      lastName: user.lastName,
      userPicturePath: user.picturePath,
      questionID: quesId,
      content,
    });
    await newReply.save();
    const question = await Question.findByIdAndUpdate(
      quesId,
      { $push: { replies: newReply._id } },
      { new: true }
    );
    res.status(201).json({
      message: "Reply posted successfully",
      reply: newReply,
      question,
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
export const postNesReply = async (req, res) => {
  try {
    const replyId = req.params.replyId;
    const { userId, content, quesId } = req.body;
    const user = await User.findById(userId);

    const newReply = new Reply({
      userId,
      firstName: user.firstName,
      lastName: user.lastName,
      userPicturePath: user.picturePath,
      questionID: quesId,
      content,
      replyId,
    });
    await newReply.save();
    const parentReply = await Reply.findByIdAndUpdate(
      replyId,
      { $push: { replies: newReply._id } },
      { new: true }
    );
    res
      .status(201)
      .json({
        message: "Reply created successfully",
        reply: newReply,
        parent: parentReply,
      });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
export const getNestedReplies = async (req, res) => {
  try {
    const replyId = req.params.replyId;
    const replies = await Reply.find({ replyId: replyId }).sort({
      createdAt: -1,
    });
    res.status(200).json({ replies });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
export const getAllReplies = async (req, res) => {
  try {
    const quesId = req.params.quesId;
    const replies = await Reply.find({ questionID: quesId }).sort({
      createdAt: -1,
    });
    res.status(200).json({ replies });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
