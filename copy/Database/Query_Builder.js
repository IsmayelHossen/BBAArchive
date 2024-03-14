const oracledb = require("oracledb");
const DBQuery = async function db_query(query) {
  let connection = undefined;
  if (connection == undefined) {
    connection = await oracledb.getConnection({
      user: "MEETING_DOC",
      password: "MEETING_DOC123",
      connectString: "192.168.3.8/bbamcs",
      // user: "system",
      // password: "system123",
      // connectString: "localhost/orcl",
    });
  }
  try {
    let result = await connection.execute(query);
    return result.rows;
  } catch (errors) {
     
  }
  finally {
    if (connection) { // conn assignment worked, need to close
      await connection.close()
    }
  }
};

module.exports = DBQuery;
