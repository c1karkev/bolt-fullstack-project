import mysql from "mysql2";

// TODO: use .env variables
const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "webshopProject",
});

con.connect((err) => {
    if (err) throw err;
    console.log("Connected to database!");
});

setup();

function setup() {
    setupProductsTable();
    setupUsersTable();
}

function setupProductsTable() {
    let sql = `CREATE TABLE IF NOT EXISTS products (
        id INT PRIMARY KEY AUTO_INCREMENT,
        name VARCHAR(255),
        description MEDIUMTEXT,
        price INT,
        imagePath TINYTEXT
    )`;
    con.query(sql, (err, result) => {
        if (err) throw err;
        console.log("Products table set up was successful");
    });
}

function setupUsersTable() {
    let sql = `CREATE TABLE IF NOT EXISTS users (
        id INT PRIMARY KEY AUTO_INCREMENT,
        name VARCHAR(63),
        email VARCHAR(63) UNIQUE,
        password_hash VARCHAR(255)
    )`;
    con.query(sql, (err, result) => {
        if (err) throw err;
        console.log("Users table set up was successful");
    });
}

export const getAllProducts = async () => {
    const [rows] = await con.promise().query("SELECT * FROM products");
    return rows;
};

export const getProductById = async (id) => {
    const [rows] = await con
        .promise()
        .query("SELECT * FROM products WHERE id = ?", [id]);
    return rows[0];
};

export const saveNewUser = async (email, passwordHash, name) => {
    const existing = await getUserByEmail(email);
    if (existing) {
        throw new Error("Email already exists");
    }

    let sql = `INSERT INTO users (name, email, password_hash) VALUES (?, ?, ?)`;
    return con.promise().query(sql, [name, email, passwordHash]);
};

export const getUserByEmail = async (email) => {
    const [rows] = await con
        .promise()
        .query("SELECT * FROM users WHERE email = ?", [email]);

    return rows[0];
};

export const getUserById = async (id) => {
    const [rows] = await con
        .promise()
        .query("SELECT * FROM users WHERE id = ?", [id]);
    return rows[0];
};
