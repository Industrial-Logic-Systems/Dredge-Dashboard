const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
const MongoClient = require("mongodb").MongoClient;

const PORT = 4000;
const fCodeToMsg = {
  CCSH: "Clearing Cutter/Suction Head",
  CESS: "Cessation",
  CLPJ: "Change Cut/Area",
  COLL: "Collisions",
  CPPL: "Clearing Pump & Pipelines",
  FBD: "Fire Drills",
  HPL: "Handling Pipelines",
  HSL: "Handling Swing Lines",
  LDNE: "Loss Due to Natural Elements",
  LDPV: "Traffic / Loss Due to Passing Vessel",
  LNL: "Transferring Plant Between Works / Transfer to New Location",
  MAJ: "Major Repairs",
  MISC: "Miscellaneous",
  MSC: "Miscellaneous / Non-Pay",
  OR: "Minor Operating Repairs",
  OSS: "Off Shift / Saturdays",
  PREP: "Preparation & Making Up Tow",
  SBT: "Stand By Time (As Directed)",
  SH: "Sundays & Holidays",
  SLSW: "Shore Line / Shore Work",
  TFS: "Taking On Fuel & Supplies",
  TFWA: "To/From Wharf/Anchorage",
  WAP: "Waiting for Attendant Plant",
  WFB: "Waiting For Booster",
  WFS: "Waiting for Scows",

  // Deprecated Codes
  AGV: "Assisting Grounded Vessels",
  CCH: "Changing Cutterhead",
  CPR: "Change Impeller",
  DR: "Dike Repair",
  HSP: "Handling Shore Pipe",
  MOB: "Mobilization & Demobilization",
  OC: "Out of Commission",
  P: "Preperation",
  RPL: "Repair Pipeline",
  SB: "Sounding & Buoying",
  TOW: "Time on Tow",
};

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

MongoClient.connect("mongodb://localhost:27017/dredge")
  .then((client) => {
    // Setup DB Connection
    console.log("Connected to MongoDB");
    const db = client.db("dredge");

    // Add Dredge Events to Database
    app.post("/api/v1/dredge/data", (req, res) => {
      const { content, dredge } = req.body;

      const events = content.DQM_Data.messages;

      // Grab Work Event
      var work_event = events.filter((event) => {
        const key = Object.keys(event)[0];
        return key.includes("work_event");
      });

      // Grab Non-Effective Event
      var non_eff_event = events.filter((event) => {
        const key = Object.keys(event)[0];
        return key.includes("non_eff_event");
      });

      // Grab Any Remaining Events
      var remaining = events.filter((event) => {
        const key = Object.keys(event)[0];
        return !key.includes("non_eff_event") && !key.includes("work_event");
      });

      work_event = work_event[0];
      non_eff_event = non_eff_event[0];

      // Add Work Event to Database
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

      // Add Non-Effective Event to Database
      if (non_eff_event) {
        const collection_name = `${dredge
          .toLowerCase()
          .replace(" ", "_")}.ne_event`;

        const collection = db.collection(collection_name);
        const data = non_eff_event.non_eff_event;

        collection
          .insertOne({
            msgStart: new Date(Date.parse(data.msg_start_time + " UTC")),
            msgEnd: new Date(Date.parse(data.msg_end_time + " UTC")),
            function_code: data.function_code.trim(),
            message: fCodeToMsg[data.function_code.trim()],
            comment: data.comment.trim(),
          })
          .then((result) => {
            console.log(result);
          })
          .catch((err) => {
            console.log(err);
          });
      }

      // Add Remaining Events to Database
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

    // Add Extra Dredge Data to Database
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

    // Get Dredge Data for a Specific Dredge
    app.get("/api/v1/dredge", (req, res) => {
      const { name, datetime } = req.query;

      const collection_name = `${name
        .toLowerCase()
        .replace(" ", "_")}.work_event`;
      const collection = db.collection(collection_name);

      const query = {
        msg_time: {
          $gte: new Date(datetime),
        },
      };
      const options = {
        sort: { msg_time: -1 },
      };

      collection
        .find(query, options)
        .toArray()
        .then((result) => {
          res.json({ data: result });
        })
        .catch((err) => {
          return res.send(err);
        });
    });

    // Get Latest Dredge Data for a Specific Dredge
    app.get("/api/v1/dredge/latest", (req, res) => {
      const { name } = req.query;

      const collection_name = `${name
        .toLowerCase()
        .replace(" ", "_")}.work_event`;
      const collection = db.collection(collection_name);

      const query = {};
      const options = {
        sort: { msg_time: -1 },
      };

      collection
        .findOne(query, options)
        .then((result) => {
          res.json({ data: [result] });
        })
        .catch((err) => {
          return res.send(err);
        });
    });

    // Get Dredge Extra Data for a Specific Dredge
    app.get("/api/v1/dredge/extra", (req, res) => {
      const { name, datetime } = req.query;

      const collection_name = `${name
        .toLowerCase()
        .replace(" ", "_")}.extra_data`;
      const collection = db.collection(collection_name);

      const query = {
        timestamp: {
          $gte: new Date(datetime),
        },
      };
      const options = {
        sort: { timestamp: -1 },
      };

      collection
        .find(query, options)
        .toArray()
        .then((result) => {
          res.json({ data: result });
        })
        .catch((err) => {
          return res.send(err);
        });
    });

    // Get Latest Dredge Extra Data for a Specific Dredge
    app.get("/api/v1/dredge/extra/latest", (req, res) => {
      const { name } = req.query;

      const collection_name = `${name
        .toLowerCase()
        .replace(" ", "_")}.extra_data`;
      const collection = db.collection(collection_name);

      const query = {};
      const options = {
        sort: { timestamp: -1 },
      };

      collection
        .findOne(query, options)
        .then((result) => {
          res.json({ data: [result] });
        })
        .catch((err) => {
          return res.send(err);
        });
    });

    // Get Dredge Non-Effective Data for a Specific Dredge
    app.get("/api/v1/dredge/non_eff", (req, res) => {
      const { name } = req.query;

      const collection_name = `${name
        .toLowerCase()
        .replace(" ", "_")}.ne_event`;
      const collection = db.collection(collection_name);

      const query = {};
      const options = {
        sort: { msg_start_time: -1 },
        limit: 10,
      };

      collection
        .find(query, options)
        .toArray()
        .then((result) => {
          res.json({ data: result });
        })
        .catch((err) => {
          return res.send(err);
        });
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
  })
  .catch((error) => console.error(error));
