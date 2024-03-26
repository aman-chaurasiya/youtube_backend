import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadOnCloudinary = async (localFilePath, cloudinaryPath) => {
  try {
    if (!localFilePath) return null;
    //upload the file on cloudnary
    const response = await cloudinary.uploader.upload(localFilePath, {
      folder: "youtube backend/" + cloudinaryPath,
      resource_type: "auto",
    });
    // file has been successfully uplaoaded
    console.log("file is uploaded on cloudinary", response.url);
    fs.unlinkSync(localFilePath);
    return response;
  } catch (error) {
    fs.unlinkSync(localFilePath); // remove the locally saved file as the upload operation got failed
    return null;
  }
};

const deleteOnCloudniary = async (fileUrl) => {
  try {
    if (!fileUrl) {
      return "!file url";
    }
    const imageArray = fileUrl.split("/");

    const imageName = imageArray[imageArray.length - 1].split(".")[0];

    const result = await cloudinary.uploader.destroy(
      imageName,
      (error, result) => {
        console.log(error);
      }
    );
    return result;
  } catch (error) {
    return "error occured";
  }
};
export { uploadOnCloudinary, deleteOnCloudniary };
