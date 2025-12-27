/**
 * Email Templates Module
 */

exports.welcomeEmail = (name) => {
    return {
        subject: "Welcome to Our App",
        html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
                <h1 style="color: #4CAF50;">Hello ${name}!</h1>
                <p style="font-size: 16px; line-height: 1.6;">Welcome to our app! We are excited to have you on board.</p>
                <p style="font-size: 14px; color: #666;">Best regards,<br>The App Team</p>
            </div>
        `
    };
};

exports.adminSignupNotification = (userData) => {
    return {
        subject: "New User Registered",
        html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
                <h1 style="color: #2196F3;">New User Signup</h1>
                <p style="font-size: 16px; line-height: 1.6;">A new user has registered on the platform:</p>
                <ul style="font-size: 14px; color: #333;">
                    <li><strong>Name:</strong> ${userData.name}</li>
                    <li><strong>Email:</strong> ${userData.email}</li>
                    <li><strong>Date:</strong> ${new Date().toLocaleString()}</li>
                </ul>
            </div>
        `
    };
};

exports.contactUsEmail = (name, email, message) => {
    return {
        subject: `New Contact Submission from ${name}`,
        html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
                <h1 style="color: #FF5722;">New Contact Message</h1>
                <p style="font-size: 16px; line-height: 1.6;">You have received a new message through the contact form:</p>
                <div style="background-color: #f9f9f9; padding: 15px; border-left: 5px solid #FF5722; margin: 10px 0;">
                    <p><strong>Name:</strong> ${name}</p>
                    <p><strong>Email:</strong> ${email}</p>
                    <p><strong>Message:</strong></p>
                    <p style="white-space: pre-wrap;">${message}</p>
                </div>
            </div>
        `
    };
};
