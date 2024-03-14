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
const routes = express.Router({})
oracledb.autoCommit = true;
oracledb.outFormat = oracledb.OBJECT;
app.use(express.json())
app.use(cors({ origin: true, credentials: true }));
app.options("*", cors())
app.use(express.static('public'))
app.use(routes);


app.use('/documents', Search_Route);
app.use('/documents', View_Route);
app.use('/documents', Create_Route);
app.use("/documents", Delete_Route);
app.use("/documents", Update_Route);

app.listen(port, () => {
   
})