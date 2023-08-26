import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { addPortfolio, getPortfolio, uploadThumbnail } from "src/api/Portfolio";
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

  //-------------------------------------------------------------------------
  const addPortfolioMutation = useMutation(addPortfolio, {
    onSuccess: () => {
      queryClient.invalidateQueries(["portfolio", userId]);
    },
  });

  const { data: portfolios } = useQuery(
    ["portfolios", userId],
    async () => {
      const response = await getPortfolio(userId);
      return response;
    },
    {
      enabled: !!userId,
    }
  );

  return {
    addPortfolioMutation,
    uploadThumbnailMutation,
    portfolios,
  };
};

export default usePortfolioInfoQueries;
