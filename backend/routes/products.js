import { Router } from "express";
import * as db from "../database/database.js";

const router = Router();

router.get("/", async (req, res) => {
    res.status(200).json(await db.getAllProducts());
});

export default router;
