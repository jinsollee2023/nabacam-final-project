import { useQuery } from "@tanstack/react-query";
import { getFreelancersBySort } from "../api/User";

const useFreelancersQueries = (selectedSortLabel: string) => {
  const {
    data: freelancersDataBySort,
    isError: freelancersError,
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
