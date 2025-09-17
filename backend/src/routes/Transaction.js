import express from 'express'
import { createTransactions, deleteTransactions, getSummary, getTransactions } from '../controllers/transactionController.js';

const router = express.Router();

router.post("/transactions", createTransactions);
router.get("/transactions/:userId", getTransactions);
router.get("/transactions/summary/:userId", getSummary);
router.delete("/transactions/:id", deleteTransactions);


export default router;