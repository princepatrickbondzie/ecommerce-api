import cloudinary from 'cloudinary';
import * as dotenv from 'dotenv';

dotenv.config()

cloudinary.v2.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET,
    shorten: true,
    secure: true,
    ssl_detected: true,
});

const uploads = (file, folder) => {
    return new Promise((resolve) => {
        cloudinary.uploader.upload(file, (result) => {
            // console.log(result)
            resolve({
                productUrl: result.url,
                mediaType: result.resource_type,
                id: result.public_id,
            })
        },
            {
                resource_type: 'auto',
                folder: folder,
            })
    })
}


export { uploads }

