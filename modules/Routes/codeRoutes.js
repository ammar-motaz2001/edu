import express from "express";
import { signInWithCode, signUp } from "../controllers/codeController.js";

const codeRouter = express.Router();

codeRouter.post("/sign-in", signUp);
codeRouter.post('/login-with-code', signInWithCode); // Add this line for code login

export { codeRouter };
