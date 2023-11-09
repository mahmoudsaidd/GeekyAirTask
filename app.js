import path from 'path'
import { fileURLToPath } from 'url'
import dotenv from 'dotenv'
const __dirname = path.dirname(fileURLToPath(import.meta.url))
dotenv.config({ path: path.join(__dirname, './config/.env') })
import express from 'express';
import { globalError } from './src/services/asyncHandler.js';


import * as indexRouter from './src/modules/index.router.js';
const app = express();

const port = process.env.PORT
const baseUrl = process.env.BASEURL

import { createTable } from './Database/connection.js';
app.use(express.json());

app.use(`${baseUrl}/book`, indexRouter.bookRouter)
app.use(`${baseUrl}/borrower`, indexRouter.borrowerRouter)
app.use(`${baseUrl}/borrowedBook`, indexRouter.borrowedBookRouter)



app.use('*', (req, res, next) => {
  res.send("In-valid Routing Plz check url  or  method")
})




createTable();

app.use(globalError)


app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});