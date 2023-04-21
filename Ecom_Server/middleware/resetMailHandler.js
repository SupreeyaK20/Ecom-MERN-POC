const nodemailer = require('nodemailer')
const ejs = require('ejs')
const path = require('path')

const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: 'nia.feil86@ethereal.email',
        pass: '1KQpwX49CzTxKNRBtp'
    }
});

const sendResetMail = async (user, token, host) =>{
    try {

        const html = await ejs.renderFile(
            path.join(__dirname, '../view/resetPasswordMailView.ejs'),
            {
              email: user.email,
              token: token,
              host: host
            }
          );

        const mailOptions ={
            from : "Ecom <no-reply@ecom.com>",
            to: user.email,
            subject: "Welcom Here!",
            html: html
        }
        
        await transporter.sendMail(mailOptions)

    } catch (error) {
        console.log(error);
    }

}

module.exports = sendResetMail