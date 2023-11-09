import { asyncHandler } from "../../services/asyncHandler.js";
import { borrowerModel } from "../../../Database/models/borrower.model.js"
import { paginate } from "../../services/pagination.js";



export const addBorrower = asyncHandler(async (req, res, next) => {

    //validate by ssn and email
    const borrower = await borrowerModel.findOne({ where: { SSN: req.body.SSN } });

    if (borrower) {
       return res.status(200).json({ message: "Borrower already exists" });
    }
    else {
        
        await borrowerModel.create(req.body);
        return res.status(200).json({ message: "Borrower added successfully" });

    } 
} )

export const updateBorrowerDetails = asyncHandler(async (req, res, next) => {
    const SSN = req.params.SSN; // Get the SSN from the URL parameter

    // Check if the borrower exists
    const borrower = await borrowerModel.findOne({ where: { SSN } });

    if (!borrower) {
        return res.status(404).json({ message: "Borrower not found" });
    }

    // Update borrower details based on the request body
    await borrower.update(req.body);

    return res.status(200).json({ message: "Borrower details updated successfully" });
});

//delete a borrower

export const deleteBorrower = asyncHandler(async (req, res, next) => {

    const SSN = req.params.SSN; // Get the SSN from the URL parameter
    const borrower = await borrowerModel.findOne({ where: { SSN } });

    if (!borrower) {
        return res.status(404).json({ message: "Borrower not found" });
    }
    else {
        await borrower.destroy();
        return res.status(200).json({ message: "Borrower deleted successfully" });
    }
});


//get all borrowers

export const getAllBorrowers = asyncHandler(async (req, res, next) => {
    const { page, size } = req.query;
    const { limit, offset } = paginate(page, size);
    const borrowers = await borrowerModel.findAll({ limit, offset });
    return res.status(200).json({ borrowers });
});
