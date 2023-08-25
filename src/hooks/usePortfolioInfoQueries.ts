import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  addPortfolioInfo,
  getPortfolioFile,
  getPortfolioInfo,
  uploadPortfolioFile,
} from "src/api/Portfolio";
import { Portfolio } from "src/Types";
import { useUserStore } from "src/zustand/useUserStore";
import { queryClient } from "../App";

const usePortfolioInfoQueries = ({
  userId,
  pfId,
}: {
  userId: string;
  pfId: string;
}) => {
  // 파일 외
  const { data: portfolios } = useQuery(
    ["portfolioInfo", userId],
    async () => {
      const response = await getPortfolioInfo(userId);
      return response;
    },
    {
      enabled: !!userId,
    }
  );

  const addPortfolioMutation = useMutation(addPortfolioInfo, {
    onSuccess: () => {
      queryClient.invalidateQueries(["portfolioInfo", userId]);
    },
  });

  // 파일
  const { data: allFilesData = [] } = useQuery(
    ["portfolioAllFiles", userId],
    async () => {
      // 썸네일
      const thumbnailResponse = await getPortfolioFile({
        userId,
        fileType: "thumbnail",
        pfId,
      });
      // pdf
      const pdfResponse = await getPortfolioFile({
        userId,
        fileType: "PDF",
        pfId,
      });
      const response = [...thumbnailResponse, ...pdfResponse];
      return response;
    },
    {
      enabled: !!userId,
    }
  );

  const uploadFileMutation = useMutation(
    ({
      file,
      fileType,
      pfId,
    }: {
      file: File;
      fileType: "thumbnail" | "pdf";
      pfId: string;
    }) => uploadPortfolioFile({ userId, file, fileType, pfId }),
    {
      onSuccess: () =>
        queryClient.invalidateQueries(["portfolioFiles", userId]),
    }
  );

  return {
    portfolios,
    addPortfolioMutation,
    allFilesData,
    uploadFileMutation,
  };
};

export default usePortfolioInfoQueries;
