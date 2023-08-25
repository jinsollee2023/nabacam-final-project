import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  addPortfolioInfo,
  getPortfolioInfo,
  uploadPortfolioFile,
} from "src/api/Portfolio";
import { Portfolio } from "src/Types";
import { useUserStore } from "src/zustand/useUserStore";
import { queryClient } from "../App";

const usePortfolioInfoQueries = (userId: string) => {
  // 파일 외
  const { data: portfolios } = useQuery(
    ["portfolioInfo"],
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
  const uploadFileMutation = useMutation(
    (file: File) => uploadPortfolioFile({ userId, file }),
    {
      onSuccess: () =>
        queryClient.invalidateQueries([["portfolioFiles"], userId]),
    }
  );

  return {
    portfolios,
    addPortfolioMutation,
    uploadFileMutation,
  };
};

export default usePortfolioInfoQueries;
