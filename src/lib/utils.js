// import { v2 as cloudinary } from 'cloudinary';
export const deserializeImages = (serializedImages) => {
    return serializedImages&&serializedImages.map((imageData) => {
      const blob = new Blob([imageData], { type: imageData.type });
      return new File([blob], imageData.name, {
        type: imageData.type,
        lastModified: imageData.lastModified,
      });
    });
  }
  
//   cloudinary.config({
//     cloud_name: process.env.CLOUDINARY_NAME,
//     api_key: process.env.CLOUDINARY_KEY,
//     api_secret: process.env.CLOUDINARY_SECRET,
//     secure: true
//   });
  
//   export const uploadToCloudinary = async (path, folder) => {
//     try {
//       const data = await cloudinary.uploader.upload(path, { folder });
//       return { url: data.url, public_id: data.public_id };
//     } catch (error) {
//       console.error(error);
//       throw error;
//     }
//   };
  
  
  
//   export const multiUploadCloudinary = async (files, folder) => {
//     try {
//       const uploadedImages = [];
//       for (const file of files) {
//         const { path } = file;
//         const result = await cloudinary.uploader.upload(path, { folder });
//         if (result.secure_url) {
//           uploadedImages.push(result.secure_url);
//         }
//       }
//       return uploadedImages;
//     } catch (error) {
//       console.error('Cloudinary Upload Error:', error);
//       throw error;
//     }
//   };
const cloudinaryUrl = `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_NAME}/image/upload`;
const uploadPreset = "Healtsy";

export async function uploadImagesToCloudinary(files) {
  try {
    const uploadedImages = await Promise.all(
      files.map(async (file) => {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", uploadPreset);

        const response = await fetch(cloudinaryUrl, {
          method: "POST",
          body: formData,
        });

        if (!response.ok) {
          throw new Error(`Failed to upload ${file.name}`);
        }

        const data = await response.json();
        return data.secure_url;
      })
    );

    return uploadedImages;
  } catch (error) {
    console.error("Error uploading images:", error);
    throw error; // Re-throw the error for the caller to handle
  }
}
