
import express from 'express'
import { code, getCode } from '../controllers/codeController.js'

const codeRouter=express.Router()

codeRouter.post("/generate-code",code)
codeRouter.post('/sign-in',getCode)

export{
    codeRouter
}