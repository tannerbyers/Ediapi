const Express = require("express");
const BodyParser = require("body-parser");
const fs = require("fs");

const MongoClient = require("mongodb").MongoClient;
const ObjectId = require("mongodb").ObjectID;
let CONNECTION_URL;

// If the config is not changed, use env vars
if (process.env.CONNECTION_URL) {
  CONNECTION_URL = process.env.CONNECTION_URL;
} else {
  fs.stat("config.js", function (err, stat) {
    if (err == null) {
      // file exists
      CONNECTION_URL = require("./config.js");
    } else if (err.code === "ENOENT") {
      // file does not exist
      console.log("No DB Connection Listed in Config or env vars")
    } else {
      console.log("Some other error: ", err.code);
    }
  });
}

const DATABASE_NAME = "CodeTable";

// Import the library:
var cors = require("cors");

var app = Express();
app.use(cors());
app.use(BodyParser.json());
app.use(BodyParser.urlencoded({ extended: true }));
var database, collection;

app.listen(process.env.PORT || 5000, () => {
  console.log(CONNECTION_URL);
  MongoClient.connect(
    CONNECTION_URL,
    { useNewUrlParser: true },
    (error, client) => {
      if (error) {
        throw error;
      }
      database = client.db(DATABASE_NAME);
      collection = database.collection("Codes");
      console.log("Connected to `" + DATABASE_NAME + "`!");
    }
  );
});

app.get("/", (request, response) => {
  response.send("Hello World");
});

app.get("/codes", (request, response) => {
  collection
    .find({})
    .limit(100)
    .toArray((error, result) => {
      if (error) {
        return response.status(500).send(error);
      }
      response.send(result);
    });
});

app.get("/codes/:value", (request, response) => {
  collection
    .find({
      $or: [
        {
          code: { $regex: `.*${request.params.value}.*` },
        },
        {
          longDescription: { $regex: `.*${request.params.value}.*` },
        },
      ],
    })
    .limit(100)
    .toArray(function (error, result) {
      if (error) {
        return response.status(500).send(error);
      }
      response.send(result);
    });
});
