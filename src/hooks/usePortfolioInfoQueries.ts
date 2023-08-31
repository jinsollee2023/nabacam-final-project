import { useMutation, useQuery } from "@tanstack/react-query";
import {
  addPortfolio,
  deletePortfolio,
  getPortfolio,
  updatePortfolio,
  uploadPDF,
  uploadThumbnail,
} from "../api/Portfolio";

import { queryClient } from "../App";
import { Portfolio } from "src/Types";

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
  const addPortfolioMutation = useMutation(
    ({
      newPortfolio,
      pfId,
      userId,
    }: {
      newPortfolio: Portfolio;
      pfId: string;
      userId: string;
    }) => addPortfolio({ newPortfolio, pfId, userId }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["portfolios", userId]);
      },
    }
  );

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

  const deletePortfolioMutation = useMutation(
    ({
      portfolioId,
      freelancerId,
    }: {
      portfolioId: string;
      freelancerId: string;
    }) => deletePortfolio(portfolioId, freelancerId),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["portfolios", userId]);
      },
    }
  );

  const updatePortfolioMutation = useMutation(
    ({
      updatedData,
      pfId,
    }: {
      updatedData: {
        freelancerId: string;
        title: string;
        desc: string;
        linkURL: string;
        thumbNailURL: string;
        pdfFileURL: string;
      };
      pfId: string;
    }) =>
      updatePortfolio({
        updatedData,
        pfId,
      }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["portfolios", userId]);
      },
    }
  );

  return {
    addPortfolioMutation,
    deletePortfolioMutation,
    updatePortfolioMutation,
    uploadThumbnailMutation,
    uploadPDFMutation,
    portfolios,
  };
};

export default usePortfolioInfoQueries;
