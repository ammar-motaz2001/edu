process.on("uncaughtException",(err)=>{
    console.log("error in code",err)
})

import express from 'express'
import { dbConnection } from './database/connection/dbConnections.js';
import { codeRouter } from './modules/Routes/codeRoutes.js';
const app = express()
import cors from 'cors'
app.use(express.json())
const port = process.env.PORT||3000
app.use(cors())
dbConnection
app.use(codeRouter)
app.get('/', (req, res) => res.send('Hello World!'))
app.listen(port, () => console.log(`Example app listening on port ${port}!`))