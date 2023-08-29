import { useEffect, useState } from "react";
import { useUserStore } from "src/zustand/useUserStore";
import {
  getPhotoURL,
  updateUser,
  updateUserImage,
  uploadUserImage,
} from "src/api/User";

import useClientsQueries from "src/hooks/useClientsQueries";
import { queryClient } from "src/App";
import { User } from "src/Types";
import { useMutation } from "@tanstack/react-query";

const Image = () => {
  // 상태관리
  const [isFormVisible, setIsFormVisible] = useState(false);
  const { userId, user, setUser } = useUserStore();
  const { updateUserMutation } = useClientsQueries({ userId });

  useEffect(() => {
    queryClient.invalidateQueries([user]);
  }, [user, setUser]);

  const uploadImageHandler = async (e: any) => {
    const file = e.target.files && e.target.files[0];
    if (user.photoURL.includes("defaultProfileImage")) {
      const filePath = await uploadUserImage(userId, file);
      const photoURL = await getPhotoURL(filePath);
      updateUserMutation.mutate({
        photoURL: `${photoURL}?updated=${new Date().getTime()}`,
        setUser,
        userId,
      });
    } else {
      const filePath = await updateUserImage(userId, file);
      const photoURL = await getPhotoURL(filePath);
      updateUserMutation.mutate({
        photoURL: `${photoURL}?updated=${new Date().getTime()}`,
        setUser,
        userId,
      });
    }
  };

  // Event Handler
  const toggleFormVisibility = () => {
    setIsFormVisible(!isFormVisible);
  };

  return (
    <>
      <img
        className="profileImg"
        src={user.photoURL}
        alt="img"
        width="60px"
        height="60px"
        style={{ marginLeft: "10px" }}
        onClick={toggleFormVisibility}
      />
      {isFormVisible && (
        <input
          type="file"
          accept="image/*"
          onChange={(e) => uploadImageHandler(e)}
        />
      )}
    </>
  );
};

export default Image;
