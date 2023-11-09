import { asyncHandler } from "../../services/asyncHandler.js";
import { bookModel } from "../../../Database/models/book.model.js"
import { paginate } from "../../services/pagination.js";
import { Op } from 'sequelize';


export const addBook = asyncHandler(async (req, res, next) => {
    // Check if the book already exists
    const book = await bookModel.findOne({ where: { ISBN: req.body.ISBN } });

    if (book) {
        // Book already exists, update availableQuantity
        const updatedBook = await bookModel.update(
            { availableQuantity: (book.availableQuantity || 0) + 1 },
            { where: { ISBN: req.body.ISBN } }
        );

        return res.status(200).json({ message: "Book added successfully" });
    }
     else {
        // Create a new book with availableQuantity set to 1
        await bookModel.create({ ...req.body, availableQuantity: 1 });
        return res.status(200).json({ message: "Book added successfully" });
    }
});


export const updateBookDetails = asyncHandler(async (req, res, next) => {
    const ISBN = req.params.ISBN; // Get the ISBN from the URL parameter

    // Check if the book exists
    const book = await bookModel.findOne({ where: { ISBN } });

    if (!book) {
        return res.status(404).json({ message: "Book not found" });
    }

    // Update book details based on the request body
    await book.update(req.body);

    return res.status(200).json({ message: "Book details updated successfully" });
});


export const deleteBook = asyncHandler(async (req, res, next) => {
    const ISBN = req.params.ISBN; // Get the ISBN from the URL parameter

    // Check if the book exists
    const book = await bookModel.findOne({ where: { ISBN } });

    if (!book) {
        return res.status(404).json({ message: "Book not found" });
    }

    // Delete the book
    await book.destroy();

    return res.status(200).json({ message: "Book deleted successfully" });
});

//list all books
export const listBooks = asyncHandler(async (req, res, next) => {
    const { page, size } = req.query;
    const { limit, offset } = paginate(page, size);

    const parsedLimit = parseInt(limit, 10);

    const books = await bookModel.findAll({ limit: parsedLimit, offset });

    if (!books) {
        return Promise.reject({ status: 500, message: "Failed to retrieve books" });
    }

        return res.status(200).json({ books });
});

export const searchByTitle = asyncHandler(async (req, res, next) => {
    const { title } = req.query;

    const books = await bookModel.findAll({
        where: {
            title: {
               
                [Op.like]: `%${title}%`,
            
            },
        },
    });

    if (!books || books.length === 0) {
        return res.status(404).json({ message: "No books found matching the title" });
    }

        return res.status(200).json({ books });
});

export const searchByAuthor = asyncHandler(async (req, res, next) => {
    const { author } = req.query;

    const books = await bookModel.findAll({
        where: {
            author: {
              
                [Op.like]: `%${author}%`,
           
            },
        },
    });

    if (!books || books.length === 0) {
        return res.status(404).json({ message: "No books found matching the author" });
    }

        return res.status(200).json({ books });
});


export const searchByISBN = asyncHandler(async (req, res, next) => {
    const { ISBN } = req.query;

    const book = await bookModel.findOne({ where: { ISBN } });

    if (!book) {
        return res.status(404).json({ message: "No book found with the provided ISBN" });
    }

        return res.status(200).json({ book });
});
