import { Code } from "../../database/models/code/code.js";

// Helper to generate a random 6-character alphanumeric code
export const generateRandomCode = () => {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const numbers = "012345678910112233446641415325246346232375724";
  const firstChar = chars.charAt(Math.floor(Math.random() * chars.length));
  let result = firstChar;
  for (let i = 0; i < 5; i++) {
    result += numbers.charAt(Math.floor(Math.random() * numbers.length));
  }
  return result;
};

// Helper to generate a random 3-digit number for 'no'
export const generateRandomNo = () => {
  return Math.floor(100 + Math.random() * 900); // Generate a random 3-digit number
};

// Controller for signing up a user and generating a code and no
export const signUp = async (req, res) => {
  const { email, fullName, grade } = req.body;

  // Validate the request body
  if (!email || !fullName || !grade) {
    return res.status(400).json({
      message: "يوجد حقل فارغ او غير صحيح",
    });
  }

  try {
    // Check if the email already exists
    const existingUser = await Code.findOne({ email });

    if (existingUser) {
      // If user exists but does not have a 'no', generate it and update the record
      if (!existingUser.no) {
        existingUser.no = generateRandomNo();
        await existingUser.save();
      }
      // If the email already exists, return the code and no
      return res.status(200).json({
        message: "البريد الإلكتروني موجود بالفعل",
        code: existingUser.code, // Return the existing code here
        no: existingUser.no, // Return the existing or newly generated no
      });
    }

    // If the email does not exist, generate a new code and random no
    const randomCode = generateRandomCode();
    const randomNo = generateRandomNo();

    // Save the new user with the generated code and no
    const newUser = await Code.create({
      email,
      fullName,
      grade,
      code: randomCode,
      no: randomNo, // Add the random 3-digit number
    });

    // Respond with the new user's details, including the code and no
    return res.status(201).json({
      message: "تم الإنشاء بنجاح",
      user: newUser, // no is already part of the newUser object now
    });
  } catch (error) {
    console.error("Error during sign-up:", error);
    return res.status(500).json({
      message: "حدث خطأ أثناء العملية",
      error: error.message,
    });
  }
};

// Controller for signing in with code
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
        no: user.no, // Include the random number (no)
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
