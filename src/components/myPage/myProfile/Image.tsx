import React, { useEffect, useState } from "react";
import supabase from "../../../config/supabaseClient";
import { useUserStore } from "src/zustand/useUserStore";
import { v4 as uuidv4 } from "uuid";
import Info from "./Info";

const Image = () => {
  // 상태관리
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [images, setImages] = useState<
    import("@supabase/storage-js/dist/module/lib/types").FileObject[]
  >([]);

  const { userId } = useUserStore();

  //
  const CDNURL =
    "https://iwbhucydhgtpozsnqeec.supabase.co/storage/v1/object/public/users";

  useEffect(() => {
    getImages();
  }, [userId]);

  const uploadImage = async (e: any) => {
    const file = e.target.files && e.target.files[0];

    if (file) {
      try {
        const { data, error } = await supabase.storage
          .from("users")
          .upload(userId + "/" + uuidv4(), file as File);

        if (data) {
          // console.log("path-data>", data);
          getImages();
        } else {
          console.log(error);
        }
      } catch (error) {
        console.error("Error uploading image:", error);
      }
    }
  };

  // Event Handler
  const toggleFormVisibility = () => {
    setIsFormVisible(!isFormVisible);
  };

  const getImages = async () => {
    try {
      const { data, error } = await supabase.storage
        .from("users")
        .list(userId + "/", {
          limit: 100,
          offset: 0,
          sortBy: { column: "name", order: "asc" },
        });

      if (data) {
        setImages(data);
      } else {
        console.error("Error loading images:", error);
      }
    } catch (error) {
      console.error("Error loading images:", error);
    }
  };

  console.log("상태관리", images[0]);

  return (
    <>
      <img
        className="profileImg"
        src={
          images.length > 0 ? CDNURL + "/" + userId + "/" + images[0].name : ""
        }
        alt="img"
        width="60px"
        height="60px"
        style={{ marginLeft: "10px" }}
        onClick={toggleFormVisibility}
      />
      {isFormVisible && (
        <input type="file" accept="image/*" onChange={(e) => uploadImage(e)} />
      )}
    </>
  );
};

export default Image;
