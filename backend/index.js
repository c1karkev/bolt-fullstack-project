import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

// routers
import authRouter from "./routes/auth.js";
import productsRouter from "./routes/products.js";
import userRouter from "./routes/user.js";

const PORT = 8000;

const app = express();
app.use(cors({ origin: "http://localhost:5500", credentials: true }));
app.use(cookieParser());
app.use(express.json());
app.use("/user", userRouter);
app.use("/auth", authRouter);
app.use("/products", productsRouter);

app.listen(PORT, () => {
    console.log(`Webshop backend started on http://localhost:${PORT}/`);
});
