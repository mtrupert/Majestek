const express = require('express')
const mysql = require('mysql');
const { createConnection } = require('net');
const { generateToken, getMailOptions, getMailOptions2, getMailPassword } = require('./service');

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



/////// Email APIs ////////////////////

// Email Registration POST
app.post('/register', (req, res) =>{
    const { email } = req.body;
    const { user } = req.body;
    const { pass } = req.body;

    if (!email) {
        res.status(400).send({
            message: "Invalid email"
        });
    }

    const token = generateToken(email, user, pass);

    const link = `http://localhost:8080/verify-email?token=${token}`;
    console.log("Token Created.")

    console.log("Mail request made.")
    
    getMailOptions(email, link, (error) => {
        if (error) {
            res.status(500).send("Can't send email");
            console.log(error);
        } else {
            res.status(200).send("Email sent");
            console.log("Completed");
        }
        
    })
}    
);


// Verify tokens sent from emails 
app.get("/verify-email", (req, res) => {
    const token = req.query.token;
    if (!token) {
        res.status(401).send("Invalid user token");
        return;
    }

    let decodedToken;
    try {
        decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
    } catch {
        res.status(401).send("Invalid authentication credentials");
        return;
    }

    if (
        !decodedToken.hasOwnProperty("email") || !decodedToken.hasOwnProperty("expirationDate")
    ) {
        res.status(401).send("Invalid authenication credentials.");
        return;
    }

    const expirationDate  = decodedToken;

    if (expirationDate < new Date()) {
        res.status(401).send("Token has expired.");
        return;
    }
    res.status(200).send("Verification Successful");
    console.log("Verification successful");

    const {user, pass, email} = decodedToken;
    
    var command = `INSERT INTO User (user_name, user_password, user_email, user_role) VALUES ( "${user}", "${pass}", "${email}", "User")`;

    db.query(command);

    console.log("User Created");
        
    }
);

// Forget Password Email POST
app.post('/forgot-password', (req, res) =>{
    const { email } = req.body;

    if (!email) {
        res.status(400).send({
            message: "Invalid email"
        });
    }

    const token = generateToken(email);

    const link = `http://localhost:8080/verify-password?token=${token}`;
    console.log("Token Created.")

    console.log("Mail request made.")
    
    getMailPassword(email, link, (error) => {
        if (error) {
            res.status(500).send("Can't send email");
            console.log(error);
        } else {
            res.status(200).send("Email sent");
            console.log("Completed");
        }
        
    })
}    
);

// GET for Change Password Email
app.get("/verify-password", (req, res) => {
    const token = req.query.token;
    if (!token) {
        res.status(401).send("Invalid user token");
        return;
    }

    let decodedToken;
    try {
        decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
    } catch {
        res.status(401).send("Invalid authentication credentials");
        return;
    }

    if (
        !decodedToken.hasOwnProperty("email") || !decodedToken.hasOwnProperty("expirationDate")
    ) {
        res.status(401).send("Invalid authenication credentials.");
        return;
    }


    const expirationDate  = decodedToken;

    if (expirationDate < new Date()) {
        res.status(401).send("Token has expired.");
        return;
    }
    res.status(200).send("Verification Successful");
    console.log("Verification successful");

    const { email } = decodedToken;

    // ADD MySQL FOR ALTERING PASSWORD
    console.log(`Please enter new password for :${email} `)
        
    }
);



///////////////////////////////////////
//POST requests



//POST Locker
app.post("/lockers/:info", async (req, res) => {
    try {

        json_info = info

        var command = "INSERT INTO Locker (locker_id, room_id, avail_status) VALUES (${info[0]}, ${info[1]}, ${info[2]})"

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
app.post("/equipment:info", async (req, res) => {
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

        var command = "INSERT INTO User (user_id, user_name, user_password, user_email, user_role, fal_stu_status) VALUES (${info[0]}, ${info[1]}, ${info[2]}, ${info[3]}, ${info[4]}, ${info[5]})"

        db.query(command)

        console.log("Information Inserted")
    }
    catch (err) {
        res.status(500).json({
            message: err,
        });
    }
});
<<<<<<< HEAD
=======





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




//UPDATE requests


//UPDATE User by user_id
app.post("/users/:user_id/:info", async (req, res) => {
    try {

        //grab the user id
        User_ID = user_id

        //Im not sure how to do this part tbh
        json_info = to_list(info)

        var command = "UPDATE User SET (user_id = ${info[0]}, user_name =${info[1]}, user_password =${info[2]}, user_email =${info[3]}, user_role =${info[4]}, fal_stu_status=${info[5]}) WHERE user_id = ${user_id}"
        db.query(command)

        console.log("Information Updated")
    }
    catch (err) {
        res.status(500).json({
            message: err,
        });
    }
});



//UPDATE equipment by equipment_id
app.post("/equipment/:equipment_id/:info", async (req, res) => {
    try {

        equip_id = equipment_id

        //Im not sure how to do this part tbh
        json_info = to_list(info)

        var command = "UPDATE Equipment  SET (equipment_id = ${info[0]}, equipment_type_id = ${info[1}, avail_status = ${info[2]}) WHERE equipment_id = ${equip_id}"
        db.query(command)

        console.log("Information Updated")
    }
    catch (err) {
        res.status(500).json({
            message: err,
        });
    }
});


//UPDATE Locker by locker_id
app.post("/lockers/:locker_id/:info", async (req, res) => {
    try {

        Locker_ID = locker_id

        json_info = info

        var command = "UPDATE Locker SET (locker_id = ${info[0]}, room_id = ${info[1]}, avail_status = ${info[2]}) WHERE locker_id = ${Locker_ID}"

        db.query(command)

        console.log("Information Updated")
    }
    catch (err) {
        res.status(500).json({
            message: err,
        });
    }
});



//UPDATE Reservation by user_id
app.post("/reservations/:user_id/:info", async (req, res) => {
    try {

        
        User_ID = user_id

        json_info = to_list(info)

        var command = "Update Reservation SET (reservation_id = ${info[0]}, equipment_id = ${info[1]}, locker_id = ${info[2]}, user_id = ${info[3]}, reserv_start = ${info[4]}, reserv_end =${info[5]}, reserv_status = ${info[6]}) WHERE user_id = ${User_ID}"

        db.query(command)

        console.log("Information Updated")
    }
    catch (err) {
        res.status(500).json({
            message: err,
        });
    }
});













app.run();
>>>>>>> parent of e3dcec1 (DELETE statements)
