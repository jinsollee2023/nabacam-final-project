import { useMutation, useQuery } from "@tanstack/react-query";
import {
  addPortfolio,
  getPortfolio,
  uploadPDF,
  uploadThumbnail,
} from "src/api/Portfolio";

import { queryClient } from "../App";

const usePortfolioInfoQueries = ({
  userId,
  pfId,
}: {
  userId: string;
  pfId?: string;
}) => {
  // 썸네일 - 스토리지
  const uploadThumbnailMutation = useMutation(
    ({ file, pfId }: { file: File; pfId: string }) =>
      uploadThumbnail({ userId, file, pfId }),
    {
      onSuccess: () =>
        queryClient.invalidateQueries(["PortfolioThumbnail", userId]),
    }
  );

  // PDF - 스토리지
  const uploadPDFMutation = useMutation(
    ({ file, pfId }: { file: File; pfId: string }) =>
      uploadPDF({ userId, file, pfId }),
    {
      onSuccess: () => queryClient.invalidateQueries(["PortfolioPDF", userId]),
    }
  );

  //-------------------------------------------------------------------------
  // 전체 포트폴리오 - dB
  const addPortfolioMutation = useMutation(addPortfolio, {
    onSuccess: () => {
      queryClient.invalidateQueries(["portfolio", userId]);
    },
  });
  const { data: portfolios } = useQuery(
    ["portfolios", userId, pfId],
    async () => {
      const response = await getPortfolio(userId);
      return response;
    },
    {
      enabled: !!userId || !!pfId,
      onSettled: () => {
        // 클릭 이벤트 후에 쿼리를 invalidate하여 다시 실행
        queryClient.invalidateQueries(["portfolios", userId, pfId]);
      },
    }
  );

  return {
    addPortfolioMutation,
    uploadThumbnailMutation,
    uploadPDFMutation,
    portfolios,
  };
};

export default usePortfolioInfoQueries;
