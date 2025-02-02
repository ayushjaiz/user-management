import nodemailer from 'nodemailer';

interface emailPayload {
    email_id: string;
    subject: string;
    body: string;
}

async function sendEmail({ email_id, subject, body }: emailPayload): Promise<void> {
    // 1. create an email transporter.
    // SMTP (Simple Mail Transfer Protocol)
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_ADMIN,
            pass: process.env.EMAIL_PASSWORD
        }
    })

    // 2. Configure email content.
    const mailOptions = {
        from: process.env.EMAIL_ADMIN,
        to: email_id,
        subject: subject,
        html: body,
    }

    //3. Send email
    try {
        const result = await transporter.sendMail(mailOptions);
    } catch (error) {
        throw new Error(`Unable to send email : ${error}`)
    }
}

export { sendEmail };