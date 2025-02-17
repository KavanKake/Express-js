const mariadb = require("mariadb");

const pool = mariadb.createPool({
  host: "localhost",
  user: "root",
  password: "LamineYamal19",
  database: "user_data",
  connectionLimit: 5,
});

async function query(sql, params) {
  let connection;
  try {
    connection = await pool.getConnection();
    const res = await connection.query(sql, params);
    return res;
  } catch (error) {
    throw error;
  } finally {
    if (connection) connection.release();
  }
}

module.exports = { query };

//Based on the MariaDB documentation https://mariadb.com/kb/en/getting-started-with-the-node-js-connector/