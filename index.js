const Express = require("express");
const BodyParser = require("body-parser");
const fs = require("fs");
const MongoClient = require("mongodb").MongoClient;
const ObjectId = require("mongodb").ObjectID;

const config = require('./config.js')
const CONNECTION_URL = config.mongodburl

const DATABASE_NAME = "CodeTable";

// Import the library:
var cors = require("cors");

var app = Express();
app.use(cors());
app.use(BodyParser.json());
app.use(BodyParser.urlencoded({ extended: true }));

app.listen(process.env.PORT || 5000, () => {
  MongoClient.connect(
    CONNECTION_URL,
    { useNewUrlParser: true },
    async (error, client) => {
      if (error) {
        throw error;
      }
      database = client.db(DATABASE_NAME);
      console.log("Connected to `" + DATABASE_NAME + "`!");
    }
  );
  console.log("server started");
});

app.get("/", (req, resp) => {
  resp.send("Ediapi started. Visit documentation for other routes");
});

app.get("/codes/hcpcs/:value", async (request, response) => {
  let collection = await database.collection("HCPCS");

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
