const express = require("express");
const bodyParser = require("body-parser");
const db = require("./services/db");

const { pool } = require("./services/db");

const dotenv = require("dotenv");
dotenv.config();

const videos = require("./services/videos");
const videoToDB = require("./services/addVideos");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

// SETTING UP THE ENVIRONMENT VARIABLES
const apiKey = process.env.API_KEY;
const searchedquery = process.env.SEARCHEDQUERY;
const url =
  process.env.URLENDPOINT +
  apiKey +
  "&type=video&part=snippet&maxResults=10&q=" +
  searchedquery +
  "&order=date";
const PORT = process.env.PORT;

// CREATES A NEW DB IF NOT EXISTS ALREADY
const createDB = () => {
  pool.query(
    "CREATE TABLE IF NOT EXISTS ytvideos(id SERIAL PRIMARY KEY, title VARCHAR, description VARCHAR, publishedDate timestamp, thumbnailUrl VARCHAR)",
    (err, response) => {
      if (err) {
        throw err;
      }
      console.log("DB Created/Replaced");
    }
  );
};

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

// SEARCH A PARTICULAR VIDEO IS PRESENT IN DB USING TITLE AND DESCRIPTION
app.post("/video", async (req, res) => {
  const titleOfVideo = req.body.titleofvideo;
  const descriptionOfVideo = req.body.descriptionofvideo;

  // QUERIES THE DB TO LOOK FOR THE REQUESTED TITLE AND DESCRIPTION VIDEO
  let data = await db.query(
    "SELECT title, description, publishedDate FROM ytvideos WHERE title=$1 OR description=$2",
    [titleOfVideo, descriptionOfVideo],
    (err, resp) => {
      if (err) {
        throw err;
      }
      data = resp;
    }
  );
  res.status(200).json({ data });
});

//  GET MULTIPLE VIDEOS STORED IN DB IN PAGINATED FORM, CAN SEND A ?page=number QUERY IN API TO GET THE VIDEOS ON THAT PAGE
app.get("/multiplevideos", async (req, res) => {
  let page = req.query.page || 1;
  let data = await videos.getMultipleVideos(page);
  res.status(200).json({ data });
});

// LISTENING TO REQUESTS ON MENTIONED PORT
app.listen(PORT, (req, res) => {
  console.log(`Server running on ${PORT}`);
  createDB();
  let token = videoToDB.addVideos(url);

  // ADDS VIDEOS TO THE DB AFTER INTERVAL OF EVERY 10 SECONDS
  setInterval(() => {
    videoToDB.addVideos(url, token);
  }, 10000);
});
