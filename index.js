const cron = require("node-cron");
const Express = require("express");
const BodyParser = require("body-parser");
const MongoClient = require("mongodb").MongoClient;
const ObjectId = require("mongodb").ObjectID;
const CONNECTION_URL =
  "mongodb+srv://codeUser:P4ppN72KhGuGpJD9@codetable.ubtee.mongodb.net/CodeTable?retryWrites=true&w=majority";
const DATABASE_NAME = "CodeTable";

var app = Express();
app.use(BodyParser.json());
app.use(BodyParser.urlencoded({ extended: true }));
var database, collection;

app.listen(5000, () => {
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

app.get("/codes", (request, response) => {
  collection.find({}).toArray((error, result) => {
    if (error) {
      return response.status(500).send(error);
    }
    response.send(result);
  });
});

app.get("/codes/:id", (request, response) => {
  collection.findOne({ code: request.params.id }, (error, result) => {
    if (error) {
      return response.status(500).send(error);
    }
    response.send(result);
  });
});

// Schedule tasks to be run on the server.

// Load HCPCS Codes From Website
cron.schedule("0 0 1 1 *", function () {
  console.log("Running tasks every year");
});
