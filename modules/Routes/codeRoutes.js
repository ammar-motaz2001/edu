import express from "express";
import { signUp } from "../controllers/codeController.js";

const codeRouter = express.Router();

codeRouter.post("/sign-in", signUp);

export { codeRouter };
