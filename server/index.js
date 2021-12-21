const express = require("express");
const cors = require("cors");
const mysql = require("mysql");

const PORT = 4000;
const DEFAULT_LIMIT = 50;

const path = __dirname + "/views/";
const app = express();

app.use(express.static(path));

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
  res.sendFile(path + "index.html");
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
  const { name, limit = DEFAULT_LIMIT } = req.query;
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
  const { name, limit = DEFAULT_LIMIT } = req.query;
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

app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`);
});
