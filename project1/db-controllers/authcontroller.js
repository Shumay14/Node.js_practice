const mysql = require("mysql");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

// connect mysql
const db = mysql.createConnection({
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE,
});

// submitted data
exports.register = (req, res) => {
  // console for checking sent data
  console.log(req.body);

  // const name = req.body.name;
  // const email = req.body.email;
  // const password = req.body.password;
  // const passwordconfirm = req.body.passwordconfirm;

  const { name, email, password, passwordconfirm } = req.body;

  // ? mark gonna be value in our database
  db.query(
    "SELECT email FROM users WHERE email = ?",
    [email],
    async (error, results) => {
      if (error) {
        console.log(error);
      }

      // results is array
      if (results.length > 0) {
        return res.render("register", {
          message: "That email is already in use",
        });
      } else if (password !== passwordconfirm) {
        return res.render("register", {
          message: "Passwords do not match",
        });
      }

      // how many times encrypt
      let hashedPassword = await bcrypt.hash(password, 8);
      console.log(hashedPassword);

      // res.send("testing");
      db.query(
        "INSERT INTO users SET ?",
        { name: name, email: email, password: hashedPassword },
        (error, results) => {
          if (error) {
            console.log(error);
          } else {
            console.log(results);
            return res.render("register", {
              message: "User registered",
            });
          }
        }
      );
    }
  );

  // res.send("Form Submitted");
};
