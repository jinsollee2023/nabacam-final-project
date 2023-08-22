import React, { useState, ChangeEvent } from "react";

interface ImagePreviewProps {
  photoURL: string;
  photoURLOnChange: (url: string) => void;
}

const ImagePreview: React.FC<ImagePreviewProps> = ({
  photoURL,
  photoURLOnChange,
}) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const handleImageChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const imageFile = e.target.files?.[0];

    if (imageFile) {
      const imageUrl = URL.createObjectURL(imageFile);
      setSelectedImage(imageUrl);
      photoURLOnChange(imageUrl);
    }
  };

  return (
    <div>
      <input type="file" accept="image/*" onChange={handleImageChange} />
      {selectedImage && (
        <img
          src={selectedImage}
          alt="Selected"
          style={{ maxWidth: "100%", maxHeight: "300px", marginTop: "10px" }}
        />
      )}
    </div>
  );
};

export default ImagePreview;
