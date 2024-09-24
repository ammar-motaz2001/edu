import { Code } from "../../database/models/code/code.js";



// Generate a random code
export const generateRandomCode = ()=> {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const numbers = "0123456789";
  const firstChar = chars.charAt(Math.floor(Math.random() * chars.length));
  let result = firstChar;
  for (let i = 0; i < 5; i++) {
    result += numbers.charAt(Math.floor(Math.random() * numbers.length));
  }
  res.json
  return result;
};

// Controller for signing up a user and generating a code
export const signUp = async (req ,res) => {
  const { email, fullName, grade } = req.body;

  try {
    // Check if the email already exists
    const existingUser = await Code.findOne({ email });

    if (existingUser) {
      // If the email already exists, return an error message
      return res.status(400).json({
        message: "البريد الالكتروني موجود بالفعل",
        code: existingUser.code,  // You can also return the existing code here
      });
    }

    // If the email does not exist, generate a new code
    const randomCode = generateRandomCode();

    // Save the new user with the generated code
    const newUser = await Code.create({
      email,
      fullName,
      grade,
      code: randomCode,
    });

    // Respond with the new user's details, including the code
    return res.status(201).json({
      message: "تم الإنشاء بنجاح",
      user: newUser,
    });
  } catch (error) {
    return res.status(500).json({
      message: "حدث خطأ أثناء العملية",
      error: error.message,
    });
  }
};

// Controller for validating the code
export const validateCode = async (req, res) => {
  const { code } = req.body;

  try {
    const existingCode = await Code.findOne({ code });

    if (existingCode) {
      return res.status(200).json({ message: "Success" });
    } else {
      return res.status(404).json({
        message: "البريد الالكتروني او الكود غير صحيح",
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: "حدث خطأ أثناء العملية",
      error: error.message,
    });
  }
};
