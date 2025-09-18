import { neon } from '@neondatabase/serverless';

export const sql = neon(process.env.DB_URL);

export const createTransactions = async (req, res) => {
    try {
        const {title, amount, category, user_id} = req.body;

        if(!title || amount===undefined || !user_id || !category)  {
            return res.status(400).json({message: "All fields are required!"});
        }

        const transactions = await sql`
        INSERT INTO transactions(user_id, title, amount, category)
        VALUES (${user_id}, ${title}, ${amount}, ${category})
        RETURNING *
        `

        res.status(201).json(transactions[0]);
    } catch (error) {
        console.log("Error creating the transactions");
        res.status(500).json(error)
    }
}


export const getTransactions = async (req, res) => {
    try {
        const {userId} = req.params;

        const transactions = await sql`
            SELECT * FROM transactions WHERE user_id = ${userId} ORDER BY created_at DESC
        `

        res.status(200).json(transactions);
    } catch (error) {
        console.log("Error on getting the transactions");
        res.status(500).json(error);
    }
}


export const getSummary = async (req, res) => {
    try {
        const {userId} = req.params;
        console.log("userId: ", userId);

        const balanceResult = await sql`
            SELECT COALESCE(SUM(amount), 0) as balance FROM transactions
            WHERE user_id = ${userId}
        ` 
        const incomeResult = await sql`
            SELECT COALESCE(SUM(amount), 0) as income FROM transactions
            WHERE user_id = ${userId} AND amount > 0
        `
        const expenseResult = await sql`
            SELECT COALESCE(SUM(-amount), 0) as expense FROM transactions
            WHERE user_id = ${userId} AND amount < 0
        `
        res.status(200).json({
            balance: balanceResult[0].balance,
            income: incomeResult[0].income,
            expense: expenseResult[0].expense
        })
    } catch (error) {
        console.log("Error to get summary");
        res.status(500).json(error);
    }
}


export const deleteTransactions = async (req, res) => {
    try {
        const {id} = req.params;

        if(isNaN(id))  {
            return res.status(400).json({message:"Invalid transaction id"})
        }

        const result = await sql`
        DELETE FROM transactions WHERE id=${id} RETURNING *
        `
        if(result.length == 0) {
            return res.send(404).json({message:"No transaction found"})
        }
        res.status(200).json({message:"Deleted successfully"})
    } catch (error) {
        console.log("Error deleting transactions")
        res.status(500).json(error);
    }
}