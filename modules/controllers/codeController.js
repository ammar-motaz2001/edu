import { Code } from "../../database/models/code/code.js";


export const generateRandomCode = () => {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const numbers = "0123456789";
  const firstChar = chars.charAt(Math.floor(Math.random() * chars.length));
  let result = firstChar;
  for (let i = 0; i < 5; i++) {
    result += numbers.charAt(Math.floor(Math.random() * numbers.length));
  }
  return result; // Simply return the generated code
};
// Controller for signing up a user and generating a code
export const signUp = async (req, res) => {
  const { email, fullName, grade } = req.body;

  // Validate the request body
  if (!email || !fullName || !grade) {
    return res.status(400).json({
      message: "الرجاء توفير جميع الحقول المطلوبة: البريد الإلكتروني، الاسم الكامل، الصف",
    });
  }

  try {
    // Check if the email already exists
    const existingUser = await Code.findOne({ email });

    if (existingUser) {
      // If the email already exists, return an error message
      return res.status(400).json({
        message: "البريد الالكتروني موجود بالفعل",
        code: existingUser.code, // Return the existing code here
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
    console.error("Error during sign-up:", error);
    return res.status(500).json({
      message: "حدث خطأ أثناء العملية",
      error: error.message,
    });
  }
};

export const signInWithCode = async (req, res) => {
  const { code } = req.body;

  // Validate the request body
  if (!code) {
    return res.status(400).json({
      message: "الرجاء توفير الكود",
    });
  }

  try {
    // Check if the code exists in the database
    const user = await Code.findOne({ code });

    if (!user) {
      return res.status(400).json({
        message: "الكود غير صحيح",
      });
    }

    // Successful login
    return res.status(200).json({
      message: "تم تسجيل الدخول بنجاح",
      user: {
        email: user.email,
        fullName: user.fullName,
        grade: user.grade,
        code: user.code,
      },
    });
  } catch (error) {
    console.error("Error during sign-in with code:", error);
    return res.status(500).json({
      message: "حدث خطأ أثناء العملية",
      error: error.message,
    });
  }
};
