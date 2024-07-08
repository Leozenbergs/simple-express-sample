import mongoose from "mongoose";

const authorSchema = new mongoose.Schema({
  id: { type: mongoose.Schema.Types.ObjectId },
  name: { type: String, required: true },
  nationality: { type: String },
}, { versionKey: false });

const Author = mongoose.model("authors", authorSchema);

export{ Author, authorSchema };