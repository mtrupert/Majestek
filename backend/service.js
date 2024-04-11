const jwt = require('jsonwebtoken');
var nodeoutlook = require('nodejs-nodemailer-outlook');
require("dotenv").config();
var nodemailer = require('nodemailer');


// Function to generate One time token to authenticate
exports.generateToken = (email, user, pass) => {
    const expirationDate = new Date();
    expirationDate.setMinutes(expirationDate.getMinutes() + 45);
    
    console.log(expirationDate)
    return jwt.sign({ email, user, pass, expirationDate }, process.env.JWT_SECRET);
};

// Function to Send Registration Link
exports.getMailOptions = (email, link) => {
    let body = 'click link here to continue registration: ' + link;

    nodeoutlook.sendEmail({
        auth: {
            user: "kyleleevy1@outlook.com",
            pass: "Ciboney1920!"
        },
        from: 'kyleleevy1@outlook.com',
        to: email,
        subject: 'UH IT Reservation Registration',
        html: body,
        text: 'this is the text version'
    });

    return
}

exports.getMailPassword = (email, link) => {
    let body = 'click link here to change your password: ' + link;

    nodeoutlook.sendEmail({
        auth: {
            user: "kyleleevy1@outlook.com",
            pass: "Ciboney1920!"
        },
        from: 'kyleleevy1@outlook.com',
        to: email,
        subject: 'Forgot Password',
        html: body,
        text: 'this is the text version'
    });

    return
}



