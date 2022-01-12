const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mysql = require("mysql");
const path = require("path");
var MongoClient = require("mongodb").MongoClient;

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
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

MongoClient.connect("mongodb://localhost:27017/dredge", {
  useUnifiedTopology: true,
})
  .then((client) => {
    console.log("Connected to MongoDB");
    const db = client.db("dredge");

    app.post("/api/v1/dredge/data", (req, res) => {
      const { content, dredge } = req.body;

      const events = content.DQM_Data.messages;

      var work_event = events.filter((event) => {
        const key = Object.keys(event)[0];
        return key.includes("work_event");
      });

      var non_eff_event = events.filter((event) => {
        const key = Object.keys(event)[0];
        return key.includes("non_eff_event");
      });

      var remaining = events.filter((event) => {
        const key = Object.keys(event)[0];
        return !key.includes("non_eff_event") && !key.includes("work_event");
      });

      work_event = work_event[0];
      non_eff_event = non_eff_event[0];

      if (work_event) {
        const collection_name = `${dredge
          .toLowerCase()
          .replace(" ", "_")}.work_event`;

        const collection = db.collection(collection_name);
        const data = work_event.work_event;

        collection
          .insertOne({
            ...data,
            msg_time: new Date(Date.parse(data.msg_time + " UTC")),
            comment: data.comment.trim(),
          })
          .then((result) => {
            console.log(result);
          })
          .catch((err) => {
            console.log(err);
          });
      }

      if (non_eff_event) {
        const collection_name = `${dredge
          .toLowerCase()
          .replace(" ", "_")}.ne_event`;

        const collection = db.collection(collection_name);
        const data = non_eff_event.non_eff_event;

        collection
          .insertOne({
            msg_start_time: new Date(Date.parse(data.msg_start_time + " UTC")),
            msg_end_time: new Date(Date.parse(data.msg_end_time + " UTC")),
            function_code: data.function_code.trim(),
            comment: data.comment.trim(),
          })
          .then((result) => {
            console.log(result);
          })
          .catch((err) => {
            console.log(err);
          });
      }

      if (remaining.length > 0) {
        remaining.forEach((element) => {
          const collection_name = `${dredge
            .toLowerCase()
            .replace(" ", "_")}.other`;

          const collection = db.collection(collection_name);
          collection
            .insertOne(element)
            .then((result) => {
              console.log(result);
            })
            .catch((err) => {
              console.log(err);
            });
        });
      }

      res.json({
        status: "success",
      });
    });

    app.post("/api/v1/dredge/data_extra", (req, res) => {
      const { content, dredge } = req.body;

      const collection_name = `${dredge
        .toLowerCase()
        .replace(" ", "_")}.extra_data`;

      const collection = db.collection(collection_name);
      collection
        .insertOne({
          ...content,
          timestamp: new Date(Date.parse(content.timestamp + " UTC")),
        })
        .then((result) => {
          console.log(result);
        })
        .catch((err) => {
          console.log(err);
        });

      res.json({
        status: "success",
      });
    });
  })
  .catch((error) => console.error(error));

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
