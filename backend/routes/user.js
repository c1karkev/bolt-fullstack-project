import { Router } from "express";
import * as tokens from "../auth/tokens.js";
import * as db from "../database/database.js";

const router = new Router();

router.get("/getUser", async (req, res) => {
    const id = +req.params.id;
    const header = req.headers.authorization;
    if (!header?.startsWith("Bearer ")) {
        return res.sendStatus(401);
    }
    const token = header.split(" ")[1];
    console.log(token);
    try {
        const tokenData = tokens.verifyToken(token);
        console.log(tokenData);
        const user = await db.getUserById(tokenData.userId);
        console.log(user);
        const response = user;
        delete response.password_hash;
        return res.status(200).json(response);
    } catch (err) {
        console.log(err);
        return res.sendStatus(401);
    }
});
export default router;
