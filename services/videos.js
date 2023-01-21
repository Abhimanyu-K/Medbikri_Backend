const db = require("./db");
const helper = require("../utils/helper");
const config = require("../config/config");

async function getMultipleVideos(page = 1) {
  const offset = helper.getOffset(page, config.listPerPage);
  let data;
  const rows = await db.query(
    "SELECT id, title, description, publishedDate, thumbnailUrl FROM ytvideos ORDER BY publishedDate DESC OFFSET $1 LIMIT $2 ",
    [offset, config.listPerPage],
    (err, resp) => {
      data = resp;
    }
  );
  console.log(rows);
  return rows;
}

module.exports = {
  getMultipleVideos,
};
