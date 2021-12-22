const express = require("express");
const cors = require("cors");
const mysql = require("mysql");
const path = require("path");

const PORT = 4000;
const DEFAULT_LIMIT = 50;

const app = express();

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "ils",
  database: "dredges",
});

connection.connect((err) => {
  if (err) {
    console.error("error connecting: " + err.stack);
    return err;
  }
});

app.use(cors());

app.get("/api/dredges", (req, res) => {
  connection.query("SELECT * FROM work_event", (err, results) => {
    if (err) {
      return res.send(err);
    }
    res.json({
      data: results,
    });
  });
});

app.get("/api/dredge", (req, res) => {
  const { name, limit = DEFAULT_LIMIT } = req.query;
  connection.query(
    `SELECT * FROM work_event where dredge="${name}" ORDER BY msg_time DESC limit ${limit}`,
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

app.get("/api/dredge_extra", (req, res) => {
  const { name, limit = DEFAULT_LIMIT } = req.query;
  var extra_name = (name.split(" ").join("_") + "_extra").toLowerCase();

  connection.query(
    `SELECT * FROM ${extra_name} ORDER BY timestamp DESC limit ${limit}`,
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

app.use(
  "/static",
  express.static(path.join(__dirname, "../client/build//static"))
);
app.get("*", (req, res) => {
  res.sendFile("index.html", {
    root: path.join(__dirname, "../client/build/"),
  });
});

app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`);
});
