import React, { useState, ChangeEvent } from "react";

interface PreviewImageProps {
  handlePhotoURLOnChange: (url: any) => void;
  defaultImage: string;
}

const PreviewImage = ({
  handlePhotoURLOnChange,
  defaultImage,
}: PreviewImageProps) => {
  const [selectedImage, setSelectedImage] = useState(defaultImage);

  const handleImageChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const imageFile = e.target.files?.[0];

    if (imageFile) {
      const imageUrl = URL.createObjectURL(imageFile);
      setSelectedImage(imageUrl);
      handlePhotoURLOnChange(e.target.files?.[0]);
    }
  };

  // 회원가입할때 한번더 올린다 .
  // 유저아이디를 유저
  return (
    <div>
      <input type="file" accept="image/*" onChange={handleImageChange} />

      <img
        id="photoURL"
        src={selectedImage}
        alt="Selected"
        style={{ maxWidth: "100%", maxHeight: "300px", marginTop: "10px" }}
      />
    </div>
  );
};

export default PreviewImage;
