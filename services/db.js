const pg = require("pg");
const config = require("../config/config");

const pool = new pg.Pool(config.db);

async function query(query, params) {
  const { rows, fields } = await pool.query(query, params);
  return rows;
}

module.exports = { query, pool };
