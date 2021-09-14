// set module
const express = require("express");
const path = require("path");
const mysql = require("mysql");

const dotenv = require("dotenv");
dotenv.config({ path: "./.env" });

const app = express();

// set routes
const pages = require("./routes/pages");
const auth = require("./routes/auth");

const db = mysql.createConnection({
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE,
});

// app setting ===

const publicDirectory = path.join(__dirname, "./public");

app.use(express.static(publicDirectory));

// Parse URL-encoded bodies (as sent by HTML forms)
app.use(express.urlencoded({ extended: false }));
// Parse JSON bodies (as sent by API clients)
app.use(express.json());

// handlebars for template as html
app.set("view engine", "hbs");

// connect with db
db.connect((error) => {
  if (error) {
    console.log(error);
  } else {
    console.log("MYSQL Connected...");
  }
});

// Define Routes
app.use("/", pages);
app.use("/auth", auth);

app.listen(5000, () => {
  console.log("Server strared on Port 5000");
});

module.exports = app;
