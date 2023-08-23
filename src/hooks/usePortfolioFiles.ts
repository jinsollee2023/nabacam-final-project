import React from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useUserStore } from "src/zustand/useUserStore";
import { uploadPortfolioFile } from "src/api/Portfolio";

/**
 * 썸네일, pdf, 링크 관련 upload커스텀훅입니다.
 */

export const usePortfolioFiles = (fileType: string) => {
  const { userId } = useUserStore();

  const queryClient = useQueryClient();
  const uploadMutation = useMutation(
    (file: File) => uploadPortfolioFile({ userId, fileType, file }),
    {
      onSuccess: () =>
        queryClient.invalidateQueries([`portfolio${fileType}`, userId]),
    }
  );
  const uploadFileHandler = async (e: any) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      uploadMutation.mutate(file);
    }
  };

  return {
    uploadFileHandler,
  };
};
