const express = require("express");
const cors = require('cors');
const bodyparser = require("body-parser");
const connection = require("./connection");
app.post('/getQuakesByMagRange', (req, res) => {
    let magRange1 = 1; // req.body.magRange1;
    let magRange2 = 2;; // req.body.magRange2;

    let sqlQuery = `Select * from eq where mag >= ${magRange1} and mag <= ${magRange2}`;
    getResult(sqlQuery, res);
});

function getResult(sqlQuery, res) {
    const request = new Request(sqlQuery,
        (err, rowCount) => {
        if (err) {
            console.error(err.message);
        } else {
            console.log(`${rowCount} row(s) returned`);
            }
        }
    );
    const rows = [];
    request.on("row", columns => {
        let row = {};
        columns.forEach((column) => {
            row[column.metadata.colName] = column.value;
        });
        rows.push(row);
    });
    
    request.on('doneInProc', (rowCount, more) => {
        console.log(rowCount + ' rows returned');
        res.send(rows);
    });
   connection.execSql(request);
}
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