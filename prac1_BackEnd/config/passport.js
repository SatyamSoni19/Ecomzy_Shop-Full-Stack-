// Passport Google OAuth Strategy Configuration
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const User = require("../models/User");
require("dotenv").config();

passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: process.env.GOOGLE_CALLBACK_URL || "/api/v1/auth/google/callback",
        },
        async (accessToken, refreshToken, profile, done) => {
            try {
                const email = profile.emails[0].value;
                const googleId = profile.id;
                const name = profile.displayName;
                const image = profile.photos[0]?.value || `https://api.dicebear.com/5.x/initials/svg?seed=${name}`;

                // Check if user already exists with this email
                let user = await User.findOne({ email });

                if (user) {
                    // User exists — attach googleId if not already set
                    if (!user.googleId) {
                        user.googleId = googleId;
                        // Update image if the user doesn't have a custom one
                        if (user.image.includes("dicebear.com")) {
                            user.image = image;
                        }
                        await user.save();
                    }
                } else {
                    // Create a new user — no password needed for Google OAuth
                    user = await User.create({
                        name,
                        email,
                        googleId,
                        image,
                        role: "user",
                    });
                }

                return done(null, user);
            } catch (error) {
                return done(error, null);
            }
        }
    )
);

// Serialize user for session (minimal — we use JWT, not sessions)
passport.serializeUser((user, done) => {
    done(null, user._id);
});

passport.deserializeUser(async (id, done) => {
    try {
        const user = await User.findById(id);
        done(null, user);
    } catch (error) {
        done(error, null);
    }
});

module.exports = passport;
