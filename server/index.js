const express = require("express");
const cors = require("cors");
const mysql = require("mysql");
const port = 4000;

const app = express();

const SELECT_ALL_PRODUCTS_QUERY = "SELECT * FROM products";

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "ils",
  database: "dredges",
});

connection.connect((err) => {
  if (err) {
    return err;
  }
});

app.use(cors());

app.get("/", (req, res) => {
  res.send("goto /products to see products");
});

app.get("/dredges", (req, res) => {
  connection.query("SELECT * FROM work_event", (err, results) => {
    if (err) {
      return res.send(err);
    }
    res.json({
      data: results,
    });
  });
});

app.get("/dredge", (req, res) => {
  const { name, limit = 10 } = req.query;
  connection.query(
    `SELECT * FROM work_event where dredge="${name}" limit ${limit}`,
    (err, results) => {
      if (err) {
        return res.send(err);
      }
      res.json({
        data: results,
      });
    }
  );
});

app.get("/dredge_extra", (req, res) => {
  const { name, limit = 10 } = req.query;
  var extra_name = (name.split(" ").join("_") + "_extra").toLowerCase();

  connection.query(
    `SELECT * FROM ${extra_name} limit ${limit}`,
    (err, results) => {
      if (err) {
        return res.send(err);
      }
      res.json({
        data: results,
      });
    }
  );
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
