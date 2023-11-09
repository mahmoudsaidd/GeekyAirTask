import { Router } from "express";
import * as borrowedBooksController from "./borrowedBook.controller.js";

const router = Router();

router.post("/borrowBook", borrowedBooksController.borrowBook);

router.post("/returnBook", borrowedBooksController.returnBook);

router.get("/listBorrowedBooks", borrowedBooksController.getAllBorrowedBooks);

router.get("/listBorrowedBooksByBorrower/:SSN", borrowedBooksController.borrowersCurrentlyBorrowedBooks);

router.get("/getOverdueBooks", borrowedBooksController.getOverdueBooks);

export default router;