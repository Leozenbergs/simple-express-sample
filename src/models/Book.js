import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
  id: { type: mongoose.Schema.Types.ObjectId },
  title: { type: String, required: [true, "Book title is required"] },
  publishing_company: {
    type: String,
    required: [true, "Book publisher is required"],
    enum: {
      values: ["Code house", "Alura"],
      message: "Input value {VALUE} is not valid. Inputed: {VALUE}"
    }
  },
  price: {type: Number},
  pages: {
    type: Number,
    min: [10, "Page number must be greater than 10. Inputed: {VALUE}"],
    max: [1000, "Page number must be lesser than 1000. Inputed: {VALUE}"]
  },
  author: { type: mongoose.Schema.Types.ObjectId, ref: "authors", required: [true, "Book author is required"] },
}, { versionKey: false });

const book = mongoose.model("books", bookSchema);

export default book;