require('dotenv').config()
const port = process.env.PORT || 3000;
const path = require('path')
const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require('cookie-parser')

const app = express();

const index = require('./src/routes/index')
// PUBLIC
app.use(express.static(path.join(__dirname, 'public')))

// TEMPLATES
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended:true}));

app.use(cookieParser())

app.use('/', index)



app.listen(port, function () {
    console.log("server is running at port ", port);
})