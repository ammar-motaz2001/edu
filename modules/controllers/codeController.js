import { Code } from "../../database/models/code/code.js";

// Function to generate a random 6-character alphanumeric code (e.g., A14432)
const generateRandomCode = () => {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const numbers = "0123456789";

  // The first character should be a letter
  const firstChar = chars.charAt(Math.floor(Math.random() * chars.length));

  // The remaining 5 characters should be digits
  let result = firstChar;
  for (let i = 0; i < 5; i++) {
    result += numbers.charAt(Math.floor(Math.random() * numbers.length));
  }

  return result;
};

const code = async (req, res) => {
  try {
    // Generate a random 6-character alphanumeric code automatically
    const randomCode = generateRandomCode();

    // Insert the generated code into the database
    const codeEntry = await Code.create({ code: randomCode });

    // Send success response with the inserted code
    res.json({ message: "success", code: codeEntry });
  } catch (error) {
    // Handle any errors that occur during the process
    res.status(500).json({ message: "error", error: error.message });
  }
};

const getCode = async (req, res) => {
  try {
    // Retrieve the code from the request body
    const userCode = req.body.code;

    // Find the code in the database using Mongoose's `findOne`
    const existingCode = await Code.findOne({ code: userCode });

    if (existingCode) {
      // If the code exists in the database, return a success message
      return res.status(200).json({
        message: "Success",
      });
    } else {
      // If the code does not exist, return a 'code not found' message
      return res.status(404).json({
        message: "هذا الكود خطا او غير موجود",
      });
    }
  } catch (error) {
    // Handle any errors that occur during the query
    return res.status(500).json({
      message: "Error occurred",
      error: error.message,
    });
  }
};

export { code, getCode };
