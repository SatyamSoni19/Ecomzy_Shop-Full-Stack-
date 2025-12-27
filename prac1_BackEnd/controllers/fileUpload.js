const User = require("../models/User")
const cloudinary = require("cloudinary").v2;

// Function For Validation
function isFileTypeSupported(fileType, supportedType) {

    return supportedType.includes(fileType)

}

// Function to Upload
async function uploadFileToCloudinary(file, folder, quality) {

    const options = {
        folder: folder,
        use_filename: true,
        unique_filename: false
    }

    if (quality) {
        options.quality = quality
    }

    options.resource_type = "auto"

    return await cloudinary.uploader.upload(file.tempFilePath, options)

}


exports.uploadProfileImage = async (req, res) => {

    try {

        // Fetch Image
        const file = req.files.profileImage // profileImage name h, kuch bhi de sakte h

        if (!file) {
            return res.status(400).json({
                success: false,
                message: "No file uploaded"
            })
        }

        // Validate File
        const supportedType = ["jpg", "jpeg", "png"];
        const fileType = file.name.split(".")[1].toLowerCase();

        // If Not Supported
        if (!isFileTypeSupported(fileType, supportedType)) {
            return res.status(400).json({
                success: false,
                message: "File type not supported"
            })
        }

        // If Supported
        // Upload File
        const response = await uploadFileToCloudinary(file, "ECOMZY")

        // Create Entry at DB
        const userId = req.user.id;
        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { image: response.secure_url },
            { new: true } // Return the updated document
        );
        res.status(200).json({
            success: true,
            message: "Profile image updated successfully",
            data: updatedUser,
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Upload failed" });
    }

}