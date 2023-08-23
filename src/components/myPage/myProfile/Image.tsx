import { useState } from "react";
import { useUserStore } from "src/zustand/useUserStore";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getFreelancerImage, uploadFreelancerImage } from "src/api/User";

const Image = () => {
  // 상태관리
  const [isFormVisible, setIsFormVisible] = useState(false);

  const { userId } = useUserStore();
  const CDNURL =
    "https://iwbhucydhgtpozsnqeec.supabase.co/storage/v1/object/public/users";

  // GET
  const { data: images = [] } = useQuery(
    ["images", userId],
    () => getFreelancerImage(userId),
    {
      enabled: !!userId,
    }
  );

  // POST & UPDATE
  const queryClient = useQueryClient();
  const uploadMutation = useMutation(
    (file: File) => uploadFreelancerImage(userId, file),
    {
      onSuccess: () => queryClient.invalidateQueries(["images", userId]),
    }
  );

  const uploadImageHandler = async (e: any) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      uploadMutation.mutate(file);
    }
  };

  // Event Handler
  const toggleFormVisibility = () => {
    setIsFormVisible(!isFormVisible);
  };

  // console.log(images);

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
