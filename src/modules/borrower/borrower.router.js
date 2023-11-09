import { Router } from "express";
import * as borrowerController from "./borrower.controller.js";

const router = Router();

router.post("/addBorrower", borrowerController.addBorrower);

router.put("/updateBorrower/:SSN", borrowerController.updateBorrowerDetails);

router.delete("/deleteBorrower/:SSN", borrowerController.deleteBorrower);

router.get("/listBorrowers", borrowerController.getAllBorrowers);

export default router;