import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  addPortfolio,
  getThumbnailURL,
  uploadThumbnail,
} from "src/api/Portfolio";
import { Portfolio } from "src/Types";
import { useUserStore } from "src/zustand/useUserStore";
import { queryClient } from "../App";

const usePortfolioInfoQueries = ({
  userId,
  pfId, // 옵션
  thumbnailFileName, // 옵션
}: {
  userId: string;
  pfId?: string;
  thumbnailFileName?: string;
}) => {
  //
  const uploadThumbnailMutation = useMutation(
    ({
      file,
      pfId,
      thumbnailFileName,
    }: {
      file: File;
      pfId: string;
      thumbnailFileName: string;
    }) => uploadThumbnail({ userId, file, pfId, thumbnailFileName }),
    {
      onSuccess: () =>
        queryClient.invalidateQueries(["PortfolioThumbnail", userId]),
    }
  );

  // const { data: thumbnailURLData } = useQuery(
  //   ["thumbnail", userId],
  //   async () => {
  //     const thumbnailResponse = await getThumbnailURL({
  //       userId,
  //     });
  //   },
  //   {
  //     enabled: !!userId,
  //   }
  // );

  const useThumbnailURLQuery = (userId: string) => {
    return useQuery(
      ["thumbnail", userId],
      async () => {
        const thumbnailResponse = await getThumbnailURL({
          userId,
        });
        return thumbnailResponse; // 데이터 반환
      },
      {
        enabled: !!userId,
      }
    );
  };

  //-------------------------------------------------------------------------
  const addPortfolioMutation = useMutation(addPortfolio, {
    onSuccess: () => {
      queryClient.invalidateQueries(["portfolio", userId]);
    },
  });

  return {
    addPortfolioMutation,
    uploadThumbnailMutation,
    useThumbnailURLQuery,
  };
};

export default usePortfolioInfoQueries;
