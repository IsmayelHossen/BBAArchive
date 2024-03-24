var express = require('express');
var app = express();

const port = 4123;
const cors = require('cors');
const oracledb = require("oracledb");
const Search_Route = require('./BBA Controller/Search');
const View_Route = require('./BBA Controller/View');
const Create_Route = require('./BBA Controller/Create');
const Delete_Route = require('./BBA Controller/Delete');
const Update_Route = require('./BBA Controller/Update');
const LoginRegRouter = require('./BBA Controller/LoginReg');
const routes=express.Router({})
const path = require('path'); // Import the path module
const dotenv = require("dotenv");
var cookieParser = require('cookie-parser')
const device = require("express-device");
oracledb.autoCommit = true;
oracledb.outFormat = oracledb.OBJECT;
dotenv.config();
app.use(device.capture());
app.use(express.json())
app.use(cors());
app.options("*", cors())
app.use(express.static('public'))
app.use(routes);
app.use(cookieParser())

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*'); // Allow requests from any origin
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});
app.use(express.static(path.join(__dirname, 'build')));

// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
// });
  // "start": "pm2 start index.js --name bakend2 --watch",
  // "start": " pm2 start index.js --watch",
  //    "start": "pm2 start index.js --log E:/Archive/Backend/to/logfile.log",
app.use('/documents', Search_Route);
app.use('/documents', View_Route);
app.use('/documents', Create_Route);
app.use("/documents",Delete_Route);
app.use("/documents",Update_Route);
app.use("/loginReg",LoginRegRouter);

// front end live from this code
// app.get('*', function (req, res) {
//   res.sendFile(path.join(__dirname, 'build', 'index.html'));
// });

app.listen(port, () => {
  console.log(`Example app listening on port' ${port}`)
})