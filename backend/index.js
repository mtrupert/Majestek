const { info } = require('console');
const express = require('express')
const mysql = require('mysql');
const { createConnection } = require('net');
const cors = require ('cors')
const jwt = require('jsonwebtoken')
const { generateToken, getMailOptions, getMailPassword } = require('./service');

require("dotenv").config();

const app = express();

app.use(express.json())

app.use(
    cors({
        origin: "*"
    })
)





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


//READ ME. To Test on Postman when variables are involved, make it:
// url/:info ; and in the PATH variable description add the data to be sent


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
    console.log("Token Created.");

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

app.get("/verify-email", (req, res) => {
    const token = req.query.token;
    if (!token) {
        res.status(401).send("Invalid user token");
        return;
    }

    let decodedToken;
    try {
        decodedToken = jwt.verify(token, process.env.JWT_SECRET);
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

    const expirationDate = new Date(decodedToken.expirationDate);

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



//Login
app.post('/login', async (req, res) => {
    const { email } = req.body;
    const { password } = req.body;

    console.log(email);
    console.log(password);


    try {
        db.query(`SELECT user_email from User WHERE user_email = "${email}";`, (err, result) => {

            if (!result || !result[0] || !result[0].user_email) {
                return res.status(400).json({ message: 'Invalid username' });
            }

            console.log(result[0].user_email)
            

        });

        console.log("Username: Passed");

        db.query(`SELECT user_password from User WHERE user_email = "${email}";`, (err, result) => {


            if(result[0].user_password != password) {
                return res.status(400).json({ message: 'Invalid username or password' });
            }

            console.log(result[0].user_password)
        

        });
        
        console.log('Password: Passed');

        db.query(`SELECT * from User WHERE user_email = "${email}";`, (err, result) => {

                
            const payload = {
                id: result[0].user_id,
                name: result[0].user_name,
                role: result[0].user_role
              };

            console.log(payload);
            console.log('sending payload..') 
            
            
            const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '30d' });
            console.log(token);

            res.json({ token });

        });

        

    } catch(err) {
        res.status(500).send('Server error');
    }
})



//POST User
app.post("/users/post/:info", async (req, res) => {


    json_info = (req.params.info)

    split = json_info.split(',')


    var command = "INSERT INTO User (user_id, user_name, user_email, user_role, falc_stu_status, user_password) VALUES (" + split[0] + ", "+ split[1] +", "+ split[2]+", "+ split[3] +", "+ split[4] +", "+ split[5]+  ")"
 

    db.query(command)

    console.log("Information Inserted")
    res.send('Information Inserted')
});

//POST Ticket
app.post("/ticket/post/:info", async (req, res) => {


    json_info = (req.params.info)

    split = json_info.split(',')


    var command = "INSERT INTO Ticket (ticket_id, ticket_desc, ticket_status, ticket_date, user_id) VALUES (" + split[0] + ", "+ split[1] +", "+ split[2]+", "+ split[3] +", "+ split[4] + ")"
 

    db.query(command)

    console.log("Information Inserted")
    res.send('Information Inserted')
});






// select or GET requests

//GET Reservations
app.get("/reservations", async (req, res) => {

    command1 = "SELECT reserv_start, user_name, user_email, equipment_type from Reservation "
    command2 = "JOIN Equipment ON Equipment.equipment_id = Reservation.equipment_id "
    command3 = "JOIN User ON User.user_id = Reservation.user_id;"

    command = command1 + command2 + command3;

    db.query(command, (err, results) => {

        console.log(results);

        res.json(results)

    });
 
});

//GET Reservation by User
app.get("/reservation-user/:user_id", async (req, res) => {

    UserID = req.params.user_id

    db.query("SELECT * FROM Reservation WHERE user_id = " + UserID, (err, result) => {

        console.log(result)

        res.send(JSON.stringify(result))

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


//GET User
app.get("/ticket", async (req, res) => {
    db.query("SELECT * FROM Ticket", (err, result) => {

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

//UPDATE Ticket by ticket_id
app.put("/ticket/update/:info", async (req, res) => {

    //make ticket id the first variable

    json_info = (req.params.info)

    split = json_info.split(',')

    var command = "Update Ticket SET ticket_desc = "+split[1] + ", ticket_status ="+split[2] + ", ticket_date = "+split[3] + " WHERE user_id ="+split[0] 

    db.query(command)

    console.log("Information Updated")
    res.send('updated')
});




// DELETE Statements


//Delete User
app.delete("/users/delete/:info", async (req,res) => {

    json_info = (req.params.info)

    split = json_info.split(',')

    var command = "DELETE FROM User WHERE user_id =" + split[0]

    db.query(command)

    console.log("delete")
    res.send('deleted')

});



//DELETE Reservation
app.delete("/reservations/delete/:info", async (req,res) => {

    json_info = (req.params.info)

    split = json_info.split(',')

    var command = "DELETE FROM Reservation WHERE reservation_id =" + split[0]

    db.query(command)

    console.log("delete")
    res.send('deleted')

});


//DELETE Locker
app.delete("/lockers/delete/:info", async (req,res) => {

    json_info = (req.params.info)

    split = json_info.split(',')

    var command = "DELETE FROM Locker WHERE locker_id =" + split[0]

    db.query(command)

    console.log("delete")
    res.send('deleted')

});

/*
foreign key constraint cannot delete equipment
app.delete("/equipment/delete/:info", async (req,res) => {

    json_info = (req.params.info)

    split = json_info.split(',')

    var command = "DELETE FROM Equipment WHERE equipment_id =" + split[0]

    db.query(command)

    console.log("delete")
    res.send('deleted')

});*/



//DELETE Ticket
app.delete("/ticket/delete/:info", async (req,res) => {

    json_info = (req.params.info)

    split = json_info.split(',')

    var command = "DELETE FROM Ticket WHERE ticket_id =" + split[0]

    db.query(command)

    console.log("delete")
    res.send('deleted')

});





module.exports = { app }
