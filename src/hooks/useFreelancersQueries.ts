import { useQuery } from "@tanstack/react-query";
import { getFreelancersBySort } from "../api/User";

const useFreelancersQueries = (selectedSortLabel: string) => {
  // 선택한 SortLabel를 기준으로 정렬된 프리랜서 데이터 불러오기
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
