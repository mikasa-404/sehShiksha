import Question from "../models/Question.js";
import User from "../models/User.js";

export const getAllQuestion = async (req, res) => {
  try {
    const questions = await Question.find().sort({ createdAt: -1 });
    return res.status(200).json(questions);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
export const getQuestion= async(req, res)=>{
  try {
    const quesId = req.params.quesId;
    const ques= await Question.findById(quesId);
    return res.status(200).json(ques);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
}
export const addQuestion = async (req, res) => {
  //add a question and return all updated questions
  try {
    const { title, content, userId } = req.body;
    const user = await User.findById(userId);
    const newQuestion = new Question({
      userId,
      firstName: user.firstName,
      lastName: user.lastName,
      userPicturePath: user.picturePath,
      title,
      content,
      replies: [],
    });
    await newQuestion.save();
    const questions = await Question.find().sort({ createdAt: -1 });
    return res.status(201).json(questions);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

