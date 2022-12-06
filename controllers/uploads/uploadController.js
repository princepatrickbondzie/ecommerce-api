import { uploads } from "../../config/cloudinary.js"
import asyncHandler from "../../middlewares/asyncHandler.js";
import * as fs from "fs";

// used to delete images from local directory
// gain access to file system
import * as util from 'util';
const deleteFile = util.promisify(fs.unlink); // unlink will delete the file

const uploadImages = asyncHandler(async (req, res) => {
    try {
        // console.log(req)
        const uploader = async (path) => await uploads(path, 'pinpat-products');
        const urls = [];
        const files = req.files;
        for (const file of files) {
            const { path } = file;
            const newPath = await uploader(path)
            urls.push(newPath);
            fs.unlinkSync(path)
        };

        // deleteFile(files.path)

        res.status(200).json({
            message: 'Image uploaded successfully',
            data: urls
        })
    } catch (err) {
        throw new Error(err)
    }

});

export { uploadImages }