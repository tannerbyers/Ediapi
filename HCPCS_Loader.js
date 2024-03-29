const https = require("https");
const fs = require("fs");
const got = require("got");
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const extract = require("extract-zip");
const xlsx = require("node-xlsx").default;
const MongoClient = require("mongodb").MongoClient;
const dotenv = require('dotenv');
dotenv.config();


const CONNECTION_URL = process.env.CONNECTION_URL;



console.log({ CONNECTION_URL });
const client = new MongoClient(CONNECTION_URL, { useNewUrlParser: true });

let newHCPCSZipFile;
const baseurl = "https://www.cms.gov";
const url =
  "https://www.cms.gov/Medicare/Coding/HCPCSReleaseCodeSets/Alpha-Numeric-HCPCS"; // link to file you want to download

const getHCPCSZipFile = async () => {
  got(url)
    .then((response) => {
      const dom = new JSDOM(response.body);
      let currentYear = 2020;
      dom.window.document.querySelectorAll("a").forEach((link) => {
        if (link.href.includes(`${currentYear}-Alpha-Numeric-HCPCS-File`)) {
          console.log(link.href);
          got(baseurl + link.href).then((response) => {
            const dom = new JSDOM(response.body);
            dom.window.document.querySelectorAll("a").forEach((link) => {
              if (
                link.href.includes(`${currentYear}-Alpha-Numeric-HCPCS-File`)
              ) {
                newHCPCSZipFile =
                  __dirname +
                  `/data/zip/${currentYear}-Alpha-Numeric-HCPCS-File.zip`;
                const file = fs.createWriteStream(newHCPCSZipFile);
                const request = https.get(
                  baseurl + link.href,
                  function (response) {
                    console.log("Downloading Zip file from HCPCS website");
                    response.pipe(file).on("finish", function () {
                      unZipHCSCFile(newHCPCSZipFile);
                    });
                  }
                );
              }
            });
          });
        }
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

const unZipHCSCFile = async (file) => {
  try {
    await extract(file, { dir: __dirname + "/data/unzip/" });
    console.log("Extraction complete");
    console.log("Sending Codes to DB");
    XLSToMongoDB();
  } catch (err) {
    // handle any errors
    console.log(err);
  }
};

const XLSToMongoDB = async () => {
  const unzippedDir = __dirname + "/data/unzip/";
  fs.readdir(unzippedDir, function async(err, files) {
    if (err) {
      console.log(err);
      return;
    }
    HCPCSFiles = files.filter((filename) =>
      filename.includes("ANWEB_w_disclaimer.xls")
    );
    console.log(HCPCSFiles);
    HCPCSFiles.forEach(async (file) => {
      const workSheetsFromFile = xlsx.parse(`${unzippedDir}/${file}`);
      //Column Names
      console.log(workSheetsFromFile[0].data[10]);
      try {
        await client.connect();
        const collection = client.db("CodeTable").collection("HCPCS");

        datasheet = workSheetsFromFile[0].data;

        // Insert the rows into MONGODB
        for (let i = 10; i < workSheetsFromFile[0].data.length; i++) {
          // Only load the HCPCS codes (no modifiers)
          if (datasheet[i][0].replace(/\s+/g, "").length == 5) {
            doc = {
              code: datasheet[i][0].replace(/\s+/g, ""),
              longDescription: datasheet[i][3],
              shortDescription: datasheet[i][4],
              effDate: datasheet[i][44],
              termDate: datasheet[i][46],
            };
            console.log(
              `Updating ${i - 10} of ${workSheetsFromFile[0].data.length - 10}`
            );
            await collection.update(doc, doc, { upsert: true });
          }
        }
        console.log("Finsihed Updated HCPCS Codes");
        client.close();
      } finally {
        await client.close;
      }
    });
  });
};

getHCPCSZipFile();
