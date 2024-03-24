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

    //sample Postman url: http://localhost:8080/lockers/post/50,1,'yes', 1
    //it has to be this way not parameters or body if you know how to fix that let me know please

    json_info = (req.params.id)

    split = json_info.split(',')


    var command = "INSERT INTO Locker (locker_id, serial_num, avail_status, room_id) VALUES (" + split[0] + ", "+ split[1] +", "+ split[2] + ", "+ split[3] + ")"
    db.query(command)

    console.log("Information Inserted")

    res.send('Information Inserted')
});

//POST Equipment
app.post("/equipment/post/:info", async (req, res) => {

    json_info = (req.params.info)


    console.log(split[1])

    var command = "INSERT INTO Equipment (equipment_id, equipment_type_id, avail_status) VALUES (" + split[0] + ", "+ split[1] +", "+ split[2] + ")"
 

    db.query(command)

    console.log("Information Inserted")
    
    res.send('Information Inserted')

});


//POST Reservation
app.post("/reservations/post/:info", async (req, res) => {

    json_info = (req.params.info)

    split = json_info.split(',')


    var command = "INSERT INTO Reservation (reservation_id, reserv_start, reserv_end,reserv_status,  equipment_id, locker_id, user_id) VALUES (" + split[0] + ", "+ split[1] +", "+ split[2]+", "+ split[3] +", "+ split[4] +", "+ split[5]+", "+ split[6]+  ")"
 

    db.query(command)

    console.log("Information Inserted")
    res.send('Information Inserted')
});



//POST User
app.post("/users/post/:info", async (req, res) => {


    json_info = (req.params.info)

    split = json_info.split(',')


    var command = "INSERT INTO User (user_id, user_name, user_email, user_role, falc_stu_status, user_password) VALUES (" + split[0] + ", "+ split[1] +", "+ split[2]+", "+ split[3] +", "+ split[4] +", "+ split[5]+  ")"
 

    db.query(command)

    console.log("Information Inserted")
    res.send('Information Inserted')
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
app.put("/users/update/:info", async (req, res) => {
 
 
    //the first value needs to be the user id and the rest the params
    
    json_info = (req.params.info)

    split = json_info.split(',')

    var command = "UPDATE User SET user_name ="+split[1] + ", user_email =" + split[2] + ", user_role = " + split[3]+", falc_stu_status =" + split[4]+", user_password =" + split[5] + " WHERE user_id =" +  split[0] 

    db.query(command)

    console.log("Information Updated")

    res.send('updated')
});



//UPDATE equipment by equipment_id
app.put("/equipment/update/:info", async (req, res) => {


    //the first value needs to be the equipment id and the rest the params

    json_info = (req.params.info)

    split = json_info.split(',')


    //because of foreign constraints you cannot change the others

    var command = "UPDATE Equipment  SET avail_status = "+split[1] + " WHERE equipment_id = "+split[0]
    db.query(command)
    console.log("Information Updated")

    res.send('updated')

});


//UPDATE Locker by locker_id
app.put("/lockers/update/:info", async (req, res) => {


   
    //the first value needs to be the locker  id and the rest the params

    json_info = (req.params.info)

    split = json_info.split(',')


    var command = "UPDATE Locker SET  serial_num = "+split[1] + ", avail_status = " + split[2] +   "WHERE locker_id ="+ split[0]

    db.query(command)

    console.log("Information Updated")
    res.send('updated')
});


//UPDATE Reservation by user_id
app.put("/reservations/update/:info", async (req, res) => {

    //start with user id


    json_info = (req.params.info)

    split = json_info.split(',')

    var command = "Update Reservation SET equipment_id = "+split[1] + ", locker_id ="+split[2] + ", user_id = "+split[3] + ", reserv_start = "+split[4] + ", reserv_end ="+split[5] + ", reserv_status = "+split[6] + " WHERE reservation_id ="+split[0] 

    db.query(command)

    console.log("Information Updated")
    res.send('updated')
});

module.exports = { app }