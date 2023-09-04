const nodemailer = require('nodemailer');
const fs = require('fs');
require('dotenv').config()
const {setLog} = require("./../helper/response");


const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_PASSWORD
    }
});


const sentEmail = (data) => {
    const pathName = data.pathFile
    const email = data.email
    const nama = data.nama
    const imageContent = fs.readFileSync( pathName, { encoding: 'base64' });

    const htmlContent = `
        <html>
            <head>
                <style>
                    body {
                        font-family: Arial, sans-serif;
                        background-color: #f2f2f2;
                    }
                    .container {
                        max-width: 400px;
                        margin: 0 auto;
                        padding: 20px;
                        background-color: #ffffff;
                        border: 1px solid #e0e0e0;
                    }
                    h1 {
                        color: #333;
                    }
                    p {
                        color: #666;
                    }
                </style>
            </head>
            <body>
                <div>
                    <h2>Hi, ${nama}!</h2>
                    <p>
                        Ini adalah QR Code untuk tiket masuk Anda!
                        Tunjukan QR Code ini kepada petugas untuk discan!
                    </p>
                    <p></p>
                    <img src="cid:unique-image-id" alt="qrcode">
                    <p>Jangan lupa untuk dibawa!</p>
                </div>
            </body>
        </html>
        `;

    console.log(data)
    const mailOptions = {
        from: process.env.EMAIL,
        to: email,
        subject: 'Registration Ticket',
        html: htmlContent,
        attachments: [
            {
              filename: 'qr-code.png',
              content: imageContent,
              cid: 'unique-image-id',
              path: pathName
            }
          ]
    };
    
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log('Error sending email:', error);
            setLog('Error sending email:', error);
        } else {
            setLog("==================== SENT EMAIL TO PESERTA ====================")
            console.log('Email sent:', info.response);
            setLog('Email sent:', info.response);
            const dataLog = {
                subject: mailOptions.subject,
                to: mailOptions.to,
                from: mailOptions.from,
                html: mailOptions.html
            }
            setLog('data:', dataLog);
        }
    });
}


module.exports = {
    sentEmail
}