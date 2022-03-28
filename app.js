const express = require("express");
const cors = require('cors');
const bodyparser = require("body-parser");
const connection = require("./connection");
const { Request } = require("tedious");
let redis = require("redis");
let crypto = require('crypto');

var app = express();
app.use(bodyparser.json());
app.use(cors({ origin: '*' }));

// Default Route
app.get('/', (req, res) => {
    res.send('Hello World Quiz!!!');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}...`);
});