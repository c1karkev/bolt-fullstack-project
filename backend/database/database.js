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
}

function setupProductsTable() {
    let sql = `CREATE TABLE IF NOT EXISTS products (id INT PRIMARY KEY AUTO_INCREMENT,
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

export const getAllProducts = async () => {
    const [rows] = await con.promise().query("SELECT * FROM products");

    return rows;
};
