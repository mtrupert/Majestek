const { info } = require('console');
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
    password: "Majestek2024",
    database: "Majestek"
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
app.post("/lockers/post/:id", async (req, res) => {

    json_info = (req.params.id)

    split = json_info.split(',')

    console.log(split[1])

    var command = "INSERT INTO Locker (locker_id, serial_num, avail_status, room_id) VALUES (" + split[0] + ", "+ split[1] +", "+ split[2] + ", "+ split[3] + ")"
    db.query(command)

    console.log("Information Inserted")

    res.send('Information Inserted')
});

//POST Equipment
app.post("/equipment:info", async (req, res) => {

    //Im not sure how to do this part tbh
    json_info = info

    var command = "INSET INTO Equipment (equipment_id, equipment_type_id, avail_status) VALUES (${info[0]}, ${info[1]}, ${info[2]})"

    db.query(command)

    console.log("Information Inserted")

});


//POST Reservation
app.post("/reservations/:info", async (req, res) => {

    //Im not sure how to do this part tbh
    json_info = info

    var command = "INSET INTO Reservation (reservation_id, equipment_id, locker_id, user_id, reserv_start, reserv_end, reserv_status) VALUES (${info[0]}, ${info[1]}, ${info[2]}, ${info[3]}, ${info[4]}, ${info[5]}, ${info[6]})"

    db.query(command)

    console.log("Information Inserted")

});



//POST User
app.post("/users/:info", async (req, res) => {


    //Im not sure how to do this part tbh
    json_info = info

    var command = "INSET INTO User (user_id, user_name, user_password, user_email, user_role, fal_stu_status) VALUES (${info[0]}, ${info[1]}, ${info[2]}, ${info[3]}, ${info[4]}, ${info[5]})"

    db.query(command)

    console.log("Information Inserted")

});

// select or GET requests

//GET Reservations
app.get("/reservations", async (req, res) => {

    db.query("SELECT * FROM Reservation", (err, result) => {

        console.log(JSON.stringify(result))

        res.send(result)

    });
});

//GET Reservation by User
app.get("/reservation-user/:user_id", async (req, res) => {

    UserID = req.params.user_id

    db.query("SELECT * FROM Reservation WHERE user_id = " + UserID, (err, result) => {

        console.log(result[0])

        res.send(JSON.stringify(result[0]))

    });
});


//GET Lockers
app.get("/lockers", async (req, res) => {


    db.query("SELECT * FROM Locker", (err, result) => {

        console.log(JSON.stringify(result))

        res.send(result)

    }
    );
}
);

//GET Equipment
app.get("/equipment", async (req, res) => {

    db.query("SELECT * FROM Equipment", (err, result) => {

        console.log(result)


        res.send({ result })

    });
});



//GET User
app.get("/users", async (req, res) => {
    db.query("SELECT * FROM User", (err, result) => {

        console.log(JSON.stringify(result))

        res.send(result)
    });
});




//UPDATE requests


//UPDATE User by user_id
app.post("/users/:user_id/:info", async (req, res) => {


    //grab the user id
    User_ID = user_id

    //Im not sure how to do this part tbh
    json_info = JSON.stringify(info)

    var command = "UPDATE User SET (user_id = ${info[0]}, user_name =${info[1]}, user_password =${info[2]}, user_email =${info[3]}, user_role =${info[4]}, fal_stu_status=${info[5]}) WHERE user_id = ${user_id}"
    db.query(command)

    console.log("Information Updated")
});



//UPDATE equipment by equipment_id
app.post("/equipment/:equipment_id/:info", async (req, res) => {

    equip_id = equipment_id

    //Im not sure how to do this part tbh
    json_info = to_list(info)

    var command = "UPDATE Equipment  SET (equipment_id = ${info[0]}, equipment_type_id = ${info[1}, avail_status = ${info[2]}) WHERE equipment_id = ${equip_id}"
    db.query(command)
    console.log("Information Updated")

});


//UPDATE Locker by locker_id
app.post("/lockers/:locker_id/:info", async (req, res) => {


    Locker_ID = locker_id

    json_info = info

    var command = "UPDATE Locker SET (locker_id = ${info[0]}, room_id = ${info[1]}, avail_status = ${info[2]}) WHERE locker_id = ${Locker_ID}"

    db.query(command)

    console.log("Information Updated")
});


//UPDATE Reservation by user_id
app.post("/reservations/:user_id/:info", async (req, res) => {



    User_ID = user_id

    json_info = to_list(info)

    var command = "Update Reservation SET (reservation_id = ${info[0]}, equipment_id = ${info[1]}, locker_id = ${info[2]}, user_id = ${info[3]}, reserv_start = ${info[4]}, reserv_end =${info[5]}, reserv_status = ${info[6]}) WHERE user_id = ${User_ID}"

    db.query(command)

    console.log("Information Updated")
});

module.exports = { app }