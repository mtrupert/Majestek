const express = require('express')
const mysql = require('mysql');
const { createConnection } = require('net');

const app = express();

PORT = 8080;

// Configuration for MySQL Database
const db = mysql.createConnection({
    host: "majestek.cdok2c8g8rtc.us-east-1.rds.amazonaws.com",
    port: "3306",
    user: "admin",
    pw: "Majestek2024",
    dbName: "Majestek"
});

db.connect((err) => {
    if (err) {
        console.log(err.message);
        return;
    }
    console.log("Database connected.")
});

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`)
});

/*
//POST requests
app.post("/lockers", async (req, res) => {
    try {




    }
    catch (err) {
        res.status(500).json({
            message: err,
        });
    }
});
*/




// select or GET requests

//get reservations
app.get("/reservations", async (req, res) => {
    try {
        const result = db.query("SELECT * FROM reservation")

        res.render({ data: result })
    }
    catch (err) {
        res.status(500).json({
            message: err,
        });
    }
});


//get reservations by user
app.get("/reservations/:userID", async (req, res) => {
    try {
        UserID = userID
        const result = db.query("SELECT * FROM reservation where UserID = ${UserID}")

        res.render({ data: result })
    }
    catch (err) {
        res.status(500).json({
            message: err,
        });
    }
});


//get lockers
app.get("/lockers", async (req, res) => {
    try {
        const result = db.query("SELECT * FROM lockers")

        res.render({ data: result })
    }
    catch (err) {
        res.status(500).json({
            message: err,
        });
    }
});


//get reservations
app.get("/equipment", async (req, res) => {
    try {
        const result = db.query("SELECT * FROM equipment")

        res.render({ data: result })
    }
    catch (err) {
        res.status(500).json({
            message: err,
        });
    }
});


//get reservations
app.get("/users", async (req, res) => {
    try {
        const result = db.query("SELECT * FROM Users")

        res.render({ data: result })
    }
    catch (err) {
        res.status(500).json({
            message: err,
        });
    }
});
 
app.run();