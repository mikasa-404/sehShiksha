import mongoose from "mongoose";
const pdfDetailsSchema = new mongoose.Schema(
  {
    pdf: String,
    title: String,
  },
  { timestamps: true }
);

const PdfDetails = mongoose.model("PdfDetails", pdfDetailsSchema);
export default PdfDetails;
