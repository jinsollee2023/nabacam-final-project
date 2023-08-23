import { useQuery } from "@tanstack/react-query";
import React from "react";
import { getPortfolioFiles } from "src/api/Portfolio";
import { useUserStore } from "src/zustand/useUserStore";

const usePortfolioGetFiles = (fileType: string) => {
  const { userId } = useUserStore();

  // get data
  const { data: files = [] } = useQuery(
    [`portfolio${fileType}`, userId],
    () => getPortfolioFiles({ userId, fileType }),
    {
      enabled: !!userId,
    }
  );
  console.log(files);

  return { files };
};

export default usePortfolioGetFiles;
