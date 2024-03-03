const mysql = require('mysql');

const db = mysql.createConnection({
    host: "majestek.cdok2c8g8rtc.us-east-1.rds.amazonaws.com",
    port: "3306",
    user: "admin",
    pw: "password",
    dbName: "Majestek"
});
