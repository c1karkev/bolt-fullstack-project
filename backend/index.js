import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

// routers
import authRouter from "./routes/auth.js";
import productsRouter from "./routes/products.js";

const PORT = 8000;

const app = express();
app.use(cors());
app.use(cookieParser());
app.use(express.json());

app.use("/auth", authRouter);
app.use("/products", productsRouter);

app.listen(PORT, () => {
    console.log(`Webshop backend started on http://localhost:${PORT}/`);
});
