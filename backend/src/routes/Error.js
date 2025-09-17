import express from "express"

const router = express.Router();

router.get("/", (req, res) => {
    res.status(500).json({message:"No route found"});
})

export default router;