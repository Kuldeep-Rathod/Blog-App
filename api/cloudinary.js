import { v2 as cloudinary } from "cloudinary";
import fs from 'fs';

// Configuration
cloudinary.config({
    cloud_name: "djsewrcyo",
    api_key: "516586948422481",
    api_secret: "twfDnzfqiGN1PPrZGLyvmk_A7V8", // Click 'View API Keys' above to copy your API secret
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
