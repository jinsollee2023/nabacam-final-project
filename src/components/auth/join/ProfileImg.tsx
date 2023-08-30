import React, { useState, ChangeEvent } from "react";

interface ProfileImgProps {
  handlePhotoURLOnChange: (url: any) => void;
}

const ProfileImg: React.FC<ProfileImgProps> = ({ handlePhotoURLOnChange }) => {
  const [selectedImage, setSelectedImage] = useState(
    "https://mblogthumb-phinf.pstatic.net/MjAyMDExMDFfMyAg/MDAxNjA0MjI5NDA4NDMy.5zGHwAo_UtaQFX8Hd7zrDi1WiV5KrDsPHcRzu3e6b8Eg.IlkR3QN__c3o7Qe9z5_xYyCyr2vcx7L_W1arNFgwAJwg.JPEG.gambasg/%EC%9C%A0%ED%8A%9C%EB%B8%8C_%EA%B8%B0%EB%B3%B8%ED%94%84%EB%A1%9C%ED%95%84_%ED%8C%8C%EC%8A%A4%ED%85%94.jpg?type=w800"
  );

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
      <br />
      <img
        src={selectedImage}
        alt="Selected"
        style={{ maxWidth: "100%", maxHeight: "200px", marginTop: "10px" }}
      />
    </div>
  );
};

export default ProfileImg;
