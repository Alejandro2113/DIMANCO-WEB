// app/pages/api/cloudinary.js

import { v2 as cloudinary } from 'cloudinary';

if (!cloudinary.config().cloud_name) {
  cloudinary.config({
    cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });
}

export const uploadImage = async (imagen) => {
  if (!imagen || !imagen.startsWith('data:image')) {
    return null;
  }

  try {
    const uploadResponse = await cloudinary.uploader.upload(imagen, {
      folder: 'projects',
      resource_type: 'auto',
    });
    return uploadResponse.secure_url;
  } catch (error) {
    console.error('Cloudinary Upload Error:', error);
    throw new Error(`Error uploading to Cloudinary: ${error.message}`);
  }
};

