const jsonwebtoken = require("jsonwebtoken");
const mysql2 = require("mysql2/promise");
const dotenv = require("dotenv");
dotenv.config();

const getTokenForAdmin = () => {
  const signedToken = jsonwebtoken.sign(
    { userName: `userDummy@gmail.com`, id: 9999999, role: "admin" },
    "PASSWORD123456789",
    { expiresIn: "60m" }
  );
  return signedToken;
};

const getTokenForNonAdmin = () => {
  const signedToken = jsonwebtoken.sign(
    { userName: `userDummy@gmail.com`, id: 9999999, role: "user" },
    "PASSWORD123456789",
    { expiresIn: "60m" }
  );
  return signedToken;
};

const connection = () => {
  const pool = mysql2.createPool({
    host: "localhost",
    user: "root",
    port: 3306,
    password: "admin",
    database: "vacations",
  });
  return pool;
};

module.exports = { getTokenForAdmin, getTokenForNonAdmin, connection };
