import React, { useState } from "react";
import AWS from "aws-sdk";

const s3 = new AWS.S3({
  accessKeyId: process.env.REACT_APP_S3_ACCESS_KEY,
  secretAccessKey: process.env.REACT_APP_S3_SECRET_KEY,
  region: process.env.REACT_APP_S3_REGION,
});

export default function ImageInput() {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedImage(file);
    }
  };

  const handleUploadImage = async () => {
    if (!selectedImage) return;

    try {
      const key = `uploads/${Date.now()}_${selectedImage.name}`;
      const params: AWS.S3.PutObjectRequest = {
        Bucket: process.env.REACT_APP_S3_BUCKET_NAME || "",
        Key: key,
        Body: selectedImage,
        ACL: "public-read",
      };

      // 이미지 업로드
      const data = await s3.upload(params).promise();
      console.log("File uploaded successfully:", data.Location);
      setImageUrl(data.Location);
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  const handleDeleteImage = async () => {
    if (!imageUrl) return;

    try {
      const key = imageUrl.split("/").pop() || "";
      const params: AWS.S3.DeleteObjectRequest = {
        Bucket: process.env.REACT_APP_S3_BUCKET_NAME || "",
        Key: key,
      };

      // 이미지 삭제
      await s3.deleteObject(params).promise();
      console.log("File deleted successfully");
      setImageUrl(null);
    } catch (error) {
      console.error("Error deleting image:", error);
    }
  };

  const handleLoadImage = async () => {
    try {
      const params: AWS.S3.ListObjectsV2Request = {
        Bucket: process.env.REACT_APP_S3_BUCKET_NAME || "",
      };

      // 이미지 불러오기
      const data = await s3.listObjectsV2(params).promise();
      console.log("Files loaded successfully:", data.Contents);

      // 첫 번째 이미지의 URL 설정
      if (data.Contents && data.Contents.length > 0) {
        const imageUrl = s3.getSignedUrl("getObject", {
          Bucket: params.Bucket,
          Key: data.Contents[0].Key,
        });
        setImageUrl(imageUrl);
      }
    } catch (error) {
      console.error("Error loading images:", error);
    }
  };

  return [
    handleImageChange,
    handleUploadImage,
    handleDeleteImage,
    handleLoadImage,
    imageUrl,
  ] as const;
}

//   return (
//     <div>
//       <input type="file" onChange={handleImageChange} />
//       <button onClick={handleUploadImage}>Upload Image</button>
//       <button onClick={handleDeleteImage}>Delete Image</button>
//       <button onClick={handleLoadImage}>Load Image</button>
//       {imageUrl && (
//         <img
//           src={imageUrl}
//           alt="Uploaded"
//           style={{ maxWidth: "100%", marginTop: "1rem" }}
//         />
//       )}
//     </div>
//   );
// }
