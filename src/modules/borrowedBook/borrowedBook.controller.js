import { asyncHandler } from "../../services/asyncHandler.js";
import { bookModel } from "../../../Database/models/book.model.js";
import { borrowerModel } from "../../../Database/models/borrower.model.js";
import { borrowedBookModel } from "../../../Database/models/borrowedBook.model.js"
import { Op } from "sequelize";
import { paginate } from "../../services/pagination.js";



export const borrowBook = asyncHandler(async (req, res, next) => {

    let { ISBN, SSN, dueDate } = req.body;

    // Check if the book is available for checkout (available quantity is 1 or more)

    const book = await bookModel.findOne({ where: { ISBN, availableQuantity: { [Op.gt]: 0 } } });
    const borrower = await borrowerModel.findOne({ where: { SSN } });

    if (!book) {
        return res.status(400).json({ message: "This book is not available for checkout" });
    }

    if (!borrower) {
        return res.status(400).json({ message: "SSN is wrong" });
    }

    // Create a new record in the borrowedBook model to represent the checkout

    const borrowedBook = await borrowedBookModel.create({
        Book: ISBN,
        Borrower: SSN,
        dueDate: new Date(dueDate)
    }, { fields: ['Book', 'Borrower', 'borrowedDate', 'dueDate', 'returnedDate'] });;

    // Decrement the available quantity of the book by 1
    
    await book.decrement('availableQuantity');

        return res.status(200).json({ message: "Book checked out successfully", borrowedBook });
});


// return book

export const returnBook = asyncHandler(async (req, res, next) => {
    let { ISBN, SSN } = req.body;

    // Check if the book is borrowed by the specified borrower
    const borrowedBook = await borrowedBookModel.findOne({
        where: { Book: ISBN, Borrower: SSN, returnedDate: null }
    });

    if (!borrowedBook) {
        return res.status(400).json({ message: "This book is not currently borrowed by the specified borrower" });
    }

    // Update returnedDate in borrowedBooks
    await borrowedBook.update({ returnedDate: new Date() });

    // Increment the available quantity of the book by 1
    const book = await bookModel.findOne({ where: { ISBN } });
    await book.increment('availableQuantity');

        return res.status(200).json({ message: "Book returned successfully" });
});


//get all borrowed books and borrowed by whom

export const getAllBorrowedBooks = asyncHandler(async (req, res, next) => {

    const { page, size } = req.query;
    const { limit, offset } = paginate(page, size);

    const borrowedBooks = await borrowedBookModel.findAll({
        limit,
        offset,
        include: [
            { model: bookModel, as: 'book' },
            { model: borrowerModel, as: 'borrower' }
        ]
    });

        return res.status(200).json({ borrowedBooks });
});


export const borrowersCurrentlyBorrowedBooks = asyncHandler(async (req, res, next) => {
    let { SSN } = req.params;

    // Find all checked-out books for the specified borrower
    const checkedOutBooks = await borrowedBookModel.findAll({
        where: { Borrower: SSN, returnedDate: null },
        include: [{ model: bookModel, as: 'book' }] // Include book details
    });

    if (checkedOutBooks.length === 0) {
        return res.status(200).json({ message: "No books currently borrowed by the borrower" });
    }

        return res.status(200).json({ checkedOutBooks });
});

// Overdue Books API
export const getOverdueBooks = asyncHandler(async (req, res, next) => {
    const today = new Date();

    // Retrieve all overdue books
    const overdueBooks = await borrowedBookModel.findAll({
        where: {
            returnedDate: null, // Book is not returned
            dueDate: {
               
                [Op.lt]: today // Due date is less than today's date
            
            }
        },
        include: [
            { model: bookModel, as: 'book' },
            { model: borrowerModel, as: 'borrower' }
        ]
    });

    if (overdueBooks.length === 0) {
        return res.status(200).json({ message: "No books are currently overdue" });
    }

        return res.status(200).json({ overdueBooks });
});
