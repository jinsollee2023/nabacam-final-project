import React from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useUserStore } from "src/zustand/useUserStore";
import { uploadPortfolioFile } from "src/api/Portfolio";

// ❷썸네일, pdf, 링크를 return하는 커스텀훅입니다.
export const usePortfolioFiles = (fileType: string) => {
  const { userId } = useUserStore();
  const CDNURL = `https://iwbhucydhgtpozsnqeec.supabase.co/storage/v1/object/public/portfolioThumbnail`;

  // get
  // const { data: files = [] } = useQuery(
  //   [`portfolio${fileType}`, userId],
  //   () => getPortfolioFiles(userId, fileType),
  //   {
  //     enabled: !!userId,
  //   }
  // );

  // post
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

  // const portfolioFileSrc =
  //   files.length > 0 ? CDNURL + `/${userId}/${files[0].name}` : "";

  return {
    // portfolioFileSrc,
    uploadFileHandler,
  };
};
