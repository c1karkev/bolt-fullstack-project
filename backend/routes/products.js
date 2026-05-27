import { Router } from "express";
import * as db from "../database/database.js";

const router = Router();

router.get("/", async (req, res) => {
    res.status(200).json(await db.getAllProducts());
});

router.get("/:id", async (req, res) => {
    const id = +req.params.id;
    const product = await db.getProductById(id);
    if (!product) {
        return res
            .status(404)
            .json({ error: "Product with this id doesn't exist" });
    }
    res.status(200).json(product);
});

export default router;
