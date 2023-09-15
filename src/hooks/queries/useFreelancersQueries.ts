import { useInfiniteQuery } from "@tanstack/react-query";
import { getFreelancersBySort } from "../../api/User";
import { IInpiniteUser } from "src/Types";

const useFreelancersQueries = (selectedSortLabel: string) => {
  const {
    data: freelancersDataBySort,
    error,
    fetchNextPage,
    hasNextPage,
    status,
  } = useInfiniteQuery<IInpiniteUser, Error>(
    ["freelancersData", selectedSortLabel],
    async ({ pageParam = 1 }) => {
      const freelancersBySortData = await getFreelancersBySort(
        selectedSortLabel,
        pageParam
      );

      const users = [];

      for (const user of freelancersBySortData.user) {
        users.push({ ...user });
      }

      return {
        user: users,
        total_count: freelancersBySortData.total_count,
      };
    },
    {
      getNextPageParam: (lastPage, allPages) => {
        const maxPage = Math.ceil(lastPage.total_count / 6);
        const nextPage = allPages.length + 1;
        return nextPage <= maxPage ? nextPage : null;
      },
    }
  );

  return {
    freelancersDataBySort,
    error,
    fetchNextPage,
    hasNextPage,
    status,
  };
};

export default useFreelancersQueries;
