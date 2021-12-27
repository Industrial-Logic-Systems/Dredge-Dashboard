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
  timezone: "UTC",
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
  const { name, datetime } = req.query;

  connection.query(
    `SELECT * FROM work_event where dredge="${name}" AND msg_time>="${datetime}" ORDER BY msg_time DESC`,
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

app.get("/api/dredge/latest", (req, res) => {
  const { name } = req.query;

  connection.query(
    `SELECT * FROM work_event where dredge="${name}" ORDER BY msg_time DESC LIMIT 1`,
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

app.get("/api/dredge/extra", (req, res) => {
  const { name, datetime } = req.query;
  var extra_name = (name.split(" ").join("_") + "_extra").toLowerCase();

  connection.query(
    `SELECT * FROM ${extra_name} WHERE timestamp>="${datetime}" ORDER BY timestamp DESC`,
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

app.get("/api/dredge/extra/latest", (req, res) => {
  const { name } = req.query;
  var extra_name = (name.split(" ").join("_") + "_extra").toLowerCase();

  connection.query(
    `SELECT * FROM ${extra_name} ORDER BY timestamp DESC LIMIT 1`,
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

app.get("/api/dredge/non_eff", (req, res) => {
  const { name } = req.query;

  connection.query(
    `SELECT * FROM ne_event where dredge="${name}" ORDER BY msgStart DESC LIMIT 10`,
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
