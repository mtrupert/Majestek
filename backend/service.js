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

exports.confirmationEmail = (email, link, item, id, start, end) => {
    let body = `Thank you for submitting your request. \n\n Here are are the details of the     reservation: \n\n Reservation: ${name} \n  Serial: ${id}  \n  Date of reservation: ${start} \n End of reservation: ${end} \n\n  Come down to the University of Houston Cullen College of Engineering Engineering Building 2, Room 103 at Martin Luther King Boulevard Houston TX 77204 to pick up your reserved equipment \n\n If you have any questions or need immediate assistance, please feel free to contact our IT support team at 713-743-0206 \n\n Thank you for choosing our services. We look forward to serving you.` ;

    nodeoutlook.sendEmail({
        auth: {
            user: "kyleleevy1@outlook.com",
            pass: "Ciboney1920!"
        },
        from: 'kyleleevy1@outlook.com',
        to: email,
        subject: 'IT Resevation Confirmation',
        html: body,
        text: 'this is the text version'
    });

    return
}




