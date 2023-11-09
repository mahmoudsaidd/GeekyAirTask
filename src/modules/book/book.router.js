import { Router } from "express";
import * as bookController from "./book.controller.js";
import { validation } from "../../../middleware/validation.js"
import { addBookSchema }from "./book.validation.js"

const router = Router();

router.post("/addBook", validation(addBookSchema), bookController.addBook);

router.put("/updateBook/:ISBN", bookController.updateBookDetails);

router.delete("/deleteBook/:ISBN", bookController.deleteBook);

router.get("/listBooks", bookController.listBooks);

router.get("/searchByTitle", bookController.searchByTitle);

router.get("/searchByAuthor", bookController.searchByAuthor);

router.get("/searchByISBN", bookController.searchByISBN);


export default router;