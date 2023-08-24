import { useQuery } from "@tanstack/react-query";
import { getFreelancersBySort } from "src/api/User";

const useFreelancersQueries = (selectedSortLabel: string) => {
  const {
    data: freelancersDataBySort,
    error: freelancersError,
    isLoading: freelancersIsLoading,
  } = useQuery(["freelancersData", selectedSortLabel], () =>
    getFreelancersBySort(selectedSortLabel)
  );

  return {
    freelancersDataBySort,
    freelancersError,
    freelancersIsLoading,
  };
};

export default useFreelancersQueries;
