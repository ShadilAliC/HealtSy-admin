import Api from "./axios";

export async function uploadImages(formData) {
    try {
      const response = await Api.post("/upload", formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      return response.data
    } catch (err) {
      console.error('Error uploading images:', err)
      throw err
    }
  }