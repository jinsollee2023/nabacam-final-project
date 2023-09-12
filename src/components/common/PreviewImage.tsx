import React, { useState, ChangeEvent, useRef, useEffect } from "react";
import { styled } from "styled-components";
import { PiCameraRotate } from "react-icons/pi";

interface PreviewImageProps {
  handlePhotoURLOnChange: (file: File | string | null) => void;
  defaultImage?: string;
  previewImage?: string;
}

const PreviewImage = ({
  handlePhotoURLOnChange,
  previewImage,
  defaultImage,
}: PreviewImageProps) => {
  const [selectedImage, setSelectedImage] = useState(
    previewImage || defaultImage
  );
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const imageFile = e.target.files?.[0];
    if (imageFile) {
      const imageUrl = URL.createObjectURL(imageFile);
      setSelectedImage(imageUrl);
      handlePhotoURLOnChange(imageFile);
    }
  };

  const handleLabelClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleChangeDefaultImageButtonClick = () => {
    setSelectedImage(defaultImage);
    handlePhotoURLOnChange(defaultImage as string);
  };

  useEffect(() => {
    // 이미지가 변경될 때 selectedImage를 업데이트
    setSelectedImage(previewImage || defaultImage);
  }, [previewImage, defaultImage]);

  return (
    <S.PreviewImageContainer>
      <S.PreviewImageBox>
        <img src={selectedImage} alt="selectedImage" />
        <S.PreviewImageLabel htmlFor="addImage" onClick={handleLabelClick}>
          <PiCameraRotate size="25" color="var(--main-blue)" />
        </S.PreviewImageLabel>
      </S.PreviewImageBox>
      {selectedImage !== defaultImage && (
        <S.DefaultImageButton
          type="button"
          onClick={handleChangeDefaultImageButtonClick}
        >
          기본 이미지로 설정
        </S.DefaultImageButton>
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
    width: 100%;
  `,

  PreviewImageBox: styled.div`
    border-radius: 5%;
    width: 200px;
    height: 200px;
    position: relative;

    img {
      border-radius: 5%;
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  `,
  PreviewImageLabel: styled.label`
    text-align: center;
    width: 50px;
    height: 50px;
    background-color: white;
    box-shadow: 0px 0px 3px rgba(0, 0, 0, 0.2);
    border-radius: 50%;
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    top: 160px;
    right: -10px;
  `,

  DefaultImageButton: styled.button`
    border: none;
    background-color: transparent;
    width: 200px;
    margin-top: 30px;
    padding: 10px 0;
    border-radius: 10px;
    color: var(--main-blue);
    border: 1px solid var(--main-blue);
  `,
};
