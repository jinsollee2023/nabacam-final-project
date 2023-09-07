import { useQuery } from "@tanstack/react-query";
import { User } from "../Types";
import { getPortfolios } from "../api/Portfolio";

const usePortfoliosQueries = (freelancerItem: User) => {
  // 프리랜서 아이템이 있어야 전체 포트폴리오 정보를 가져올 수 있다..
  const {
    data: portfoliosData,
    error: portfoliosError,
    isLoading: portfoliosIsLoading,
  } = useQuery(["portfoliosData"], getPortfolios, {
    enabled: !!freelancerItem,
  });

  return {
    portfoliosData,
    portfoliosError,
    portfoliosIsLoading,
  };
};

export default usePortfoliosQueries;
