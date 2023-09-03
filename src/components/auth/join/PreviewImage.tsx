import React, { useState, ChangeEvent, useRef } from "react";
import { styled } from "styled-components";

interface PreviewImageProps {
  handlePhotoURLOnChange: (url: any) => void;
  defaultImage: string;
}

const PreviewImage = ({
  handlePhotoURLOnChange,
  defaultImage,
}: PreviewImageProps) => {
  const [selectedImage, setSelectedImage] = useState(defaultImage);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const imageFile = e.target.files?.[0];

    if (imageFile) {
      const imageUrl = URL.createObjectURL(imageFile);
      setSelectedImage(imageUrl);
      handlePhotoURLOnChange(e.target.files?.[0]);
    }
  };

  const handleLabelClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  // 회원가입할때 한번더 올린다 .
  // 유저아이디를 유저
  return (
    <S.PreviewImageContainer>
      <S.PreviewImageBox>
        <img src={selectedImage} alt="Selected" style={{}} />
      </S.PreviewImageBox>
      {selectedImage === defaultImage ? (
        <S.PreviewImageLabel htmlFor="addImage" onClick={handleLabelClick}>
          이미지 등록
        </S.PreviewImageLabel>
      ) : (
        <label
          htmlFor="addImage"
          onClick={handleLabelClick}
          style={{
            fontWeight: "bold",
            textAlign: "center",
            width: "200px",
            color: "gray",
          }}
        >
          이미지 변경
        </label>
      )}

      <input
        type="file"
        accept="image/*"
        id="addImageInputt"
        style={{ display: "none" }}
        ref={fileInputRef}
        onChange={handleImageChange}
      />
      <br />
    </S.PreviewImageContainer>
  );
};

export default PreviewImage;

const S = {
  PreviewImageContainer: styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  `,

  PreviewImageBox: styled.div`
    border-radius: 5%;
    width: 200px;
    height: 200px;
    overflow: hidden;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  `,
  PreviewImageLabel: styled.label`
    font-weight: bold;
    text-align: center;
    width: 200px;
  `,
};
