const mysql = require("mysql");

const Connection = async (req, res, next) => {
  try {
    const connection = mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "",
      database: "document",
    });

    // Establishing the MySQL connection
    connection.connect((err) => {
      if (err) {
        console.error("Error connecting to MySQL database:", err);
        next("Database connection problem");
        return;
      }
      console.log("Connected to MySQL database");
    });

    // Assigning the connection object to the request object
    req.mysqlConnection = connection;

    // Calling the next middleware or route handler
    next();
  } catch (error) {
    console.error("Error establishing MySQL database connection:", error);
    next("Database connection problem");
  }
};

module.exports = Connection;
