const nodemailer = require("nodemailer");

class MailSender {
    constructor() {
        this._transporter = nodemailer.createTransport({
            host: process.env.MAIL_HOST,
            port: process.env.MAIL_PORT,
            auth: {
                user: process.env.MAIL_ADDRESS,
                pass: process.env.MAIL_PASSWORD,
            },
        });
    }
    
    sendEmail(targetEmail, {id, name}, content) {
        const message = {
            from: "Open Music App",
            to: targetEmail,
            subject: `Exported Songs From - ${name}`,
            text: `Here's the exported result from - ${name}.`,
            attachments: [
                {
                    filename: `${id}.json`,
                    content,
                },
            ],
        };
        
        return this._transporter.sendMail(message);
    }
}

module.exports = MailSender;