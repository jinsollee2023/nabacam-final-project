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

const usePortfolioInfoQueries = (userId: string) => {
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
      //
      const thumbnailResponse = await getPortfolioFile({
        userId,
        fileType: "thumbnail",
      });
      //
      const pdfResponse = await getPortfolioFile({ userId, fileType: "PDF" });
      const response = [...thumbnailResponse, ...pdfResponse];
      return response;
    },
    {
      enabled: !!userId,
    }
  );

  const uploadFileMutation = useMutation(
    ({ file, fileType }: { file: File; fileType: "thumbnail" | "pdf" }) =>
      uploadPortfolioFile({ userId, file, fileType }),
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
