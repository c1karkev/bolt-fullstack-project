import express from "express";

// routers
import usersRouter from "./routes/users.js";
import productsRouter from "./routes/products.js";

const PORT = 8000;

const app = new express();
app.use(express.json());

app.use("/users", usersRouter);
app.use("/products", productsRouter);

app.listen(PORT, () => {
    console.log(`Webshop backend started on http://localhost:${PORT}/`);
});
