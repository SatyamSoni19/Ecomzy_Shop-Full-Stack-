const transporter = require("../config/emailConfig");

/**
 * Generic service to send emails
 * @param {string} to - Recipient email
 * @param {string} subject - Email subject
 * @param {string} html - Email body in HTML format
 */
exports.sendEmail = async (to, subject, html) => {
    try {
        const mailOptions = {
            from: `"The App Team" <${process.env.EMAIL_USER}>`,
            to,
            subject,
            html
        };

        const info = await transporter.sendMail(mailOptions);
        console.log(`Email sent successfully to ${to}:`, info.response);
        return info;
    } catch (error) {
        console.error(`Error sending email to ${to}:`, error);
        // We throw the error so the controller can handle it if needed
        throw error;
    }
};
