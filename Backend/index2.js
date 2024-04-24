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
const fs = require('fs');
const https = require('https');
var cookieParser = require('cookie-parser')
const device = require("express-device");
const RouteCheckUsingJWT = require('./Database/RouteChecking/RouteCheckingUsingjws');
oracledb.autoCommit = true;
oracledb.outFormat = oracledb.OBJECT;
dotenv.config();
app.use(device.capture());
app.use(express.json())
app.use(cors());
app.options("*", cors())

app.use(routes);
app.use(cookieParser())

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*'); // Allow requests from any origin
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});
app.use(express.static(path.join(__dirname, 'build')));
// 
app.use(express.static('public'))



  //    "start": "pm2 start index.js --log E:/Archive/Backend/to/logfile.log",
  // "start": "pm2 start index.js --log E:/Archive/Backend/to/logfile.log",



// app.use(RouteCheckUsingJWT)
// function restrictUploadDocAccess(req, res, next) {
//   if (req.path.startsWith('/uploadDoc')) {
//     // Check if user is authenticated
//     if (req.name) {
//       console.log('reqname',req.name)
//       next();
    
//     }
//     else{
//       return res.status(401).send('Unauthorized');
//     }
//     // Add additional checks if needed, e.g., user role check
//     // if (req.user.role !== 'admin') {
//     //   return res.status(403).send('Forbidden');
//     // }

//   }
  
// }
// app.use(restrictUploadDocAccess);
app.use('/documents', Search_Route);
app.use('/documents', View_Route);
app.use('/documents', Create_Route);
app.use("/documents",Delete_Route);
app.use("/documents",Update_Route);
app.use("/loginReg",LoginRegRouter);
//Authorization middleware for file protecte
// function StaticFileProtect(req, res, next) {
  
// console.log(" req.user_rule", req.path.split('/')[1])
//   if (req.path.split('/')[1]=='uploadDoc') {

//     return next();
//   } else {
//     return res.status(403).send('Unauthorized');
//   }
// }

// Middleware to protect files
// app.use('', StaticFileProtect, express.static(path.join(__dirname, 'public')));

// front end live from this code
app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});



app.listen(port, () => {
  console.log(`Example app listening on port' ${port}`)
})



//ssl https configure
// SSL certificate options
// const options = {
//   key: fs.readFileSync('path/to/your/private/key.pem'),
//   cert: fs.readFileSync('path/to/your/ssl/certificate.pem')
// };

// // Create HTTPS server
// const server = https.createServer(options, app);

// // Start listening
// server.listen(port, () => {
//   console.log(`Example app listening on port ${port}!`);
// })