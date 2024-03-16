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



//POST requests

//POST Locker
app.post("/lockers/:info", async (req, res) => {
    try {
        
        json_info = info

        var command = "INSET INTO Locker (locker_id, room_id, avail_status) VALUES (${info[0]}, ${info[1]}, ${info[2]})"

        db.query(command)

        console.log("Information Inserted")
    }
    catch (err) {
        res.status(500).json({
            message: err,
        });
    }
});


//POST Equipment
app.post("//equipment:info", async (req, res) => {
    try {
        
        //Im not sure how to do this part tbh
        json_info = to_list(info)

        var command = "INSET INTO Equipment (equipment_id, equipment_type_id, avail_status) VALUES (${info[0]}, ${info[1]}, ${info[2]})"

        db.query(command)

        console.log("Information Inserted")
    }
    catch (err) {
        res.status(500).json({
            message: err,
        });
    }
});


//POST Reservation
app.post("/reservations/:info", async (req, res) => {
    try {
        
        //Im not sure how to do this part tbh
        json_info = to_list(info)

        var command = "INSET INTO Reservation (reservation_id, equipment_id, locker_id, user_id, reserv_start, reserv_end, reserv_status) VALUES (${info[0]}, ${info[1]}, ${info[2]}, ${info[3]}, ${info[4]}, ${info[5]}, ${info[6]})"

        db.query(command)

        console.log("Information Inserted")
    }
    catch (err) {
        res.status(500).json({
            message: err,
        });
    }
});



//POST User
app.post("/users/:info", async (req, res) => {
    try {
        
        //Im not sure how to do this part tbh
        json_info = to_list(info)

        var command = "INSET INTO User (user_id, user_name, user_password, user_email, user_role, fal_stu_status) VALUES (${info[0]}, ${info[1]}, ${info[2]}, ${info[3]}, ${info[4]}, ${info[5]})"

        db.query(command)

        console.log("Information Inserted")
    }
    catch (err) {
        res.status(500).json({
            message: err,
        });
    }
});





// select or GET requests

//GET Reservations
app.get("/reservations", async (req, res) => {
    try {
        const result = db.query("SELECT * FROM Reservation")

        console.log(result)

        res.render({ data: result })
    }
    catch (err) {
        res.status(500).json({
            message: err,
        });
    }
});


//GET Reservation by User
app.get("/reservations/:user_id", async (req, res) => {
    try {
        UserID = user_id
        const result = db.query("SELECT * FROM Reservation where user_id = ${UserID}")

        console.log(result)

        res.render({ data: result })
    }
    catch (err) {
        res.status(500).json({
            message: err,
        });
    }
});


//GET Lockers
app.get("/lockers", async (req, res) => {
    try {
        const result = db.query("SELECT * FROM Locker")

        console.log(result)

        res.render({ data: result })
    }
    catch (err) {
        res.status(500).json({
            message: err,
        });
    }
});


//GET Equipment
app.get("/equipment", async (req, res) => {
    try {
        const result = db.query("SELECT * FROM Equipment")

        console.log(result)


        res.render({ data: result })
    }
    catch (err) {
        res.status(500).json({
            message: err,
        });
    }
});


//GET User
app.get("/users", async (req, res) => {
    try {
        const result = db.query("SELECT * FROM User")

        console.log(result)

        res.render({ data: result })
    }
    catch (err) {
        res.status(500).json({
            message: err,
        });
    }
});
 
app.run();