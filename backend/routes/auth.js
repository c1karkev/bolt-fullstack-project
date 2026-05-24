import { Router } from "express";
import * as db from "../database/database.js";
import argon2 from "argon2";
import * as tokens from "../auth/tokens.js";

const router = Router();

router.post("/register", async (req, res) => {
    const { email, password, name } = req.body;
    if (!email || !password || !name) {
        return res.status(400).json({ error: "Required data not provided" });
    }
    try {
        const [result] = await db.saveNewUser(
            email,
            await argon2.hash(password),
            name,
        );
        const user = db.getUserById(result.insertId);
        const accessToken = tokens.createAccessToken(user);
        const refreshToken = tokens.createRefreshToken(user);

        // send access token as cookie
        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: true,
            sameSite: "lax",
            path: "/auth/refresh",
        });
        return res.status(200).json({ accessToken });
    } catch (err) {
        return res.status(400).json({ error: err.message });
    }
});

router.post("/login", async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await db.getUserByEmail(email);
        if (!user) {
            return res.status(401).json({ error: "Invalid credentials" });
        }
        // validate password
        if (!(await argon2.verify(user.password_hash, password))) {
            return res.status(401).json({ error: "Invalid credentials" });
        }
        const accessToken = tokens.createAccessToken(user);
        const refreshToken = tokens.createRefreshToken(user);

        // send access token as cookie
        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: true,
            sameSite: "lax",
            path: "/auth/refresh",
        });
        return res.status(200).json({ accessToken });
    } catch (err) {
        return res.status(400).json({ error: err.message });
    }
});

export default router;
