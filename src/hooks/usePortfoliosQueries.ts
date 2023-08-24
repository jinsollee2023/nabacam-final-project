import { useQuery } from "@tanstack/react-query";
import { User } from "src/Types";
import { getPortfolios } from "src/api/Portfolio";

const usePortfoliosQueries = (freelancerItem: User) => {
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
