const axios = require("axios");
const db = require("./db");

// ADDS FETCHED VIDEO RESPONSE DATA TO DB
const addVideos = async (url, token = "") => {
  if (token !== "") {
    url = url + "&nextPageToken=" + token;
  }
  let nextPageToken;
  axios
    .get(url)
    .then((response) => {
      retdata = response.data.items;
      nextPageToken = response.data.nextPageToken;
      for (let i in response.data.items) {
        const item = response.data.items[i];
        const title = item.snippet.title;
        const description = item.snippet.description;
        const publishedDate = item.snippet.publishedAt;
        const thumbnailUrl = item.snippet.thumbnails.default.url;

        // INSERTS ONLY SELECTED FIELDS INTO DB
        db.query(
          "INSERT INTO ytvideos (title, description, publishedDate, thumbnailUrl) VALUES ($1, $2, $3, $4)",
          [title, description, publishedDate, thumbnailUrl],
          (err, resp) => {
            if (err) {
              throw err;
            }
          }
        );
      }
      return nextPageToken;
    })
    .catch((err) => console.log(err));
};

module.exports = { addVideos };
