import mongoose from "mongoose";
export const dbConnection = mongoose
  .connect("mongodb+srv://edu-chemistry:edu-chemistry@cluster0.nltsf0p.mongodb.net/edu-chemistry")
  .then(() => {
    console.log("database Connected Successfully");
  })
  .catch(() => {
    console.log("database disConnected");
  });
