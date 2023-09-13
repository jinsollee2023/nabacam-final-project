import { useInfiniteQuery, useMutation, useQuery } from "@tanstack/react-query";
import {
  addPortfolio,
  deletePortfolio,
  getMyPortfolio,
  getPortfolio,
  updatePortfolio,
  uploadPDF,
  uploadThumbnail,
} from "../api/Portfolio";

import { queryClient } from "../App";
import { IPortfolio, Portfolio } from "src/Types";

const usePortfolioInfoQueries = ({
  userId,
  pfId,
  page,
}: {
  userId: string;
  pfId?: string;
  page?: number;
  // page?: number;
}) => {
  // 썸네일 - 스토리지
  const uploadThumbnailMutation = useMutation(
    ({ file, pfId }: { file: File; pfId: string }) => uploadThumbnail({ userId, file, pfId }),
    {
      onSuccess: () => queryClient.invalidateQueries(["PortfolioThumbnail", userId]),
    }
  );

  // PDF - 스토리지
  const uploadPDFMutation = useMutation(
    ({ file, pfId }: { file: File; pfId: string }) => uploadPDF({ userId, file, pfId }),
    {
      onSuccess: () => queryClient.invalidateQueries(["PortfolioPDF", userId]),
    }
  );

  //-------------------------------------------------------------------------
  // 전체 포트폴리오 - dB
  const addPortfolioMutation = useMutation(
    ({ newPortfolio, pfId, userId }: { newPortfolio: Portfolio; pfId: string; userId: string }) =>
      addPortfolio({ newPortfolio, pfId, userId }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["portfolios", userId]);
      },
    }
  );

  const {
    data: portfolio,
    error,
    fetchNextPage,
    hasNextPage,
    status,
  } = useInfiniteQuery<IPortfolio, Error, IPortfolio>(
    ["portfolios", userId],
    async ({ pageParam = 1 }) => {
      const response = await getMyPortfolio(userId as string, pageParam);

      const portfolios = [];

      for (const portfolio of response.portfolio) {
        portfolios.push({ ...portfolio });
      }

      return {
        portfolio: portfolios,
        total_count: response.total_count,
      };
    },
    {
      enabled: !!userId,
      getNextPageParam: (lastPage, allPages) => {
        const maxPage = Math.ceil(lastPage.total_count / 8);
        const nextPage = allPages.length + 1;
        return nextPage <= maxPage ? nextPage : null;
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
    ({ portfolioId, freelancerId }: { portfolioId: string; freelancerId: string }) =>
      deletePortfolio(portfolioId, freelancerId),
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
    portfolio,
    error,
    fetchNextPage,
    hasNextPage,
    status,
  };
};

export default usePortfolioInfoQueries;
