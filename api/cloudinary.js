import { v2 as cloudinary } from "cloudinary";
import fs from 'fs';

// Configuration
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET, // Click 'View API Keys' above to copy your API secret
});

const uploadOnCloudinary = async (localFilePath) => {
    try {
        if (!localFilePath) {
            throw new Error('File path is required');
        }

        const uploadResult = await cloudinary.uploader
            .upload(localFilePath, {
                resource_type: 'auto',
            });

        // Remove local file after upload if needed
        if (fs.existsSync(localFilePath)) {
            fs.unlinkSync(localFilePath);
        }

        return uploadResult.url;
    } catch (error) {
        console.error(error);
        // Ensure local file is removed if an error occurs
        if (fs.existsSync(localFilePath)) {
            fs.unlinkSync(localFilePath);
        }
        throw error;
    }
};

export default uploadOnCloudinary;
