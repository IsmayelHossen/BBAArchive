const mysql = require('mysql')


const DBQuery = async function db_query(query) {
  let connection = undefined;
  if (connection == undefined) {
    connection = mysql.createConnection({
     host: 'localhost',
  user: 'root',
  password: '',
     database: 'document',
    //  charset: 'utf8mb4'
    });
    await new Promise((resolve, reject) => {
      
      connection.connect((err) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });
  }
  try {
    let result = await new Promise((resolve, reject) => {
      connection.query(query, (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });
    // console.log("result",result)
    return result;
  } catch (error) {
    console.error(error);
    throw new Error("Query not executed");
  } finally {
    connection.end();
  }
};

module.exports = DBQuery;






// const { createPool } = require("mysql");

// const pool = createPool({
//   host: 'localhost',
//      user: 'root',
//     password: '',
//      database: 'test1',
//   connectionLimit: 10,
//   connectTimeout: 60 * 60 * 1000,
//   acquireTimeout: 60 * 60 * 1000,
//   timeout: 60 * 60 * 1000,
// });
// module.exports = pool;
// const DBQuery = async function db_query(query) {
//   let connection = undefined;
//   if (connection == undefined) {

//      connection =await mysql.createConnection({
//   host: 'localhost',
//   user: 'root',
//   password: '',
//   database: 'test1'
// })

//   }
//   const abc=connection.connect()
//   console.log("connection",abc)

//   try {
//     let results = await  connection.query(query, function (err, result) {
//       if (err) throw err;
//       return result;
   
//       // return result.rows
      
//     });

//     // let result = await connection.query(query);
//      console.log(results)
//     //  return results.rows;
//   } catch (errors) {
//     console.log(errors);
//     console.log("Query not executed");
//   } finally {
//     connection.end()
//   }
// };

// module.exports = DBQuery;
// const oracledb = require("oracledb");
// const DBQuery = async function db_query(query) {
//   let connection = undefined;
//   if (connection == undefined) {
//     connection = await oracledb.getConnection({
//       user: "MEETING_DOC",
//       password: "MEETING_DOC123",
//       connectString: "192.168.3.8/bbamcs",
//       // user: "system",
//       // password: "system123",
//       // connectString: "localhost/orcl",
//     });
//   }
//   try {
//     let result = await connection.execute(query);
//     return result.rows;
//   } catch (errors) {
//     console.log(errors);
//     console.log("Query not executed");
//   } finally {
//     connection.close();
//   }
// };

// module.exports = DBQuery;