
export const deserializeImages = (serializedImages) => {
    return serializedImages&&serializedImages.map((imageData) => {
      const blob = new Blob([imageData], { type: imageData.type });
      return new File([blob], imageData.name, {
        type: imageData.type,
        lastModified: imageData.lastModified,
      });
    });
  }

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
    throw error; 
  }
}
export function generateUniqueId() {
  return Math.random().toString(36).substr(2, 9);
}