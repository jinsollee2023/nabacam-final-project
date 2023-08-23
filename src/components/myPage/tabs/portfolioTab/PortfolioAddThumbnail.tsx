import { useEffect, useState } from "react";
import { useUserStore } from "src/zustand/useUserStore";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getFreelancerPortfolioThumbnail,
  uploadFreelancerPortfolioThumbnail,
} from "src/api/User";
import { usePortfolioStore } from "src/zustand/usePortfolioStore";
import { styled } from "styled-components";

const PortfolioAddThumbnail = () => {
  // 상태관리
  const [isFormVisible, setIsFormVisible] = useState(false);
  const { setUserportfolioThumbnailSrc } = usePortfolioStore();

  const { userId } = useUserStore();
  const CDNURL =
    "https://iwbhucydhgtpozsnqeec.supabase.co/storage/v1/object/public/portfolioThumbnail";

  // GET
  const { data: images = [] } = useQuery(
    ["portfolioThumbnail", userId],
    () => getFreelancerPortfolioThumbnail(userId),
    {
      enabled: !!userId,
    }
  );

  // POST & UPDATE
  const queryClient = useQueryClient();
  const uploadMutation = useMutation(
    (file: File) => uploadFreelancerPortfolioThumbnail(userId, file),
    {
      onSuccess: () =>
        queryClient.invalidateQueries(["portfolioThumbnail", userId]),
    }
  );

  const uploadImageHandler = async (e: any) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      uploadMutation.mutate(file);
    }
  };

  const portfolioThumbnailSrc =
    images.length > 0 ? CDNURL + "/" + userId + "/" + images[0].name : "";
  // console.log(portfolioThumbnailSrc);

  useEffect(() => {
    setUserportfolioThumbnailSrc(portfolioThumbnailSrc);
  }, [portfolioThumbnailSrc, setUserportfolioThumbnailSrc]);

  // Event Handler
  const toggleFormVisibility = () => {
    setIsFormVisible(!isFormVisible);
  };

  return (
    <>
      <S.ThumbnailButton onClick={toggleFormVisibility}>
        +썸네일 첨부하기
      </S.ThumbnailButton>
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

export default PortfolioAddThumbnail;

export const S = {
  ThumbnailButton: styled.button`
    cursor: pointer;
    padding: 10px;
    background-color: #007bff;
    color: white;
    border-radius: 5px;
    text-align: center;
    &:hover {
      background-color: #0056b3;
    }
  `,
};
