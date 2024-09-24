import mongoose from "mongoose";

// Schema with email, fullName, and grade
const codeSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true, // Ensures email is unique in the database
    validate: {
      validator: async function (value) {
        const emailCount = await mongoose.models.Code.countDocuments({ email: value });
        return !emailCount; // Validation will fail if email already exists
      },
      message: 'البريد الإلكتروني موجود بالفعل'
    }
  },
  fullName: { type: String, required: true },
  grade: {
    type: String,
    enum: ["الصف الاول الثانوي", "الصف الثاني الثانوي", "الصف الثالث الثانوي"], // Restrict to 3 choices
    required: true
  },
  code: { type: String, required: true }
}, { timestamps: true });

export const Code = mongoose.model("Code", codeSchema);
