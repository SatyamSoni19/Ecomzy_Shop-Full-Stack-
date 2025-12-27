const emailService = require("../services/emailService");
const emailTemplates = require("../templates/emails/emailTemplates");

// Contact Form Handler
exports.contactUs = async (req, res) => {
    try {
        const { name, email, message } = req.body;

        // Validation
        if (!name || !email || !message) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            });
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({
                success: false,
                message: "Invalid email format"
            });
        }

        // --- EMAIL NOTIFICATION ---
        try {
            const adminTmpl = emailTemplates.contactUsEmail(name, email, message);
            await emailService.sendEmail(process.env.ADMIN_EMAIL || process.env.EMAIL_USER, adminTmpl.subject, adminTmpl.html);
        } catch (emailErr) {
            console.error("Contact notification email error:", emailErr);
            // We don't fail the request if just the email notification fails
        }

        // Log the message (optional, but good for visibility if email is removed)
        console.log(`Received contact form submission from ${name} (${email}): ${message}`);

        res.status(200).json({
            success: true,
            message: "Thank you for your feedback! We have received your message."
        });

    } catch (error) {
        console.error("Contact form error:", error);
        res.status(500).json({
            success: false,
            message: "Failed to process message. Please try again later."
        });
    }
};
