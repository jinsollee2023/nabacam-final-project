import { useEffect, useState } from "react";
import {
  Values,
  usePortfolioValuesStore,
} from "../zustand/usePortfolioValuesStore";

const usePortfolioValid = () => {
  const { values } = usePortfolioValuesStore();

  const [isTitleValid, setIsTitleValid] = useState<boolean | null>(
    values.title ? true : null
  );

  const [isDescValid, setIsDescValid] = useState<boolean | null>(
    values.desc ? true : null
  );

  const [isThumbNailValid, setIsThumbNailValid] = useState<boolean | null>(
    values.thumbNailURL ? true : null
  );

  const [isPdfValid, setIsPdfValid] = useState<boolean | null>(
    values.pdfFileURL ? true : null
  );

  const [isLinkValild, setIsLinkValid] = useState<boolean | null>(
    values.linkURL ? true : null
  );

  useEffect(() => {
    if (isTitleValid === false || isTitleValid === true) {
      values.title && setIsTitleValid(true);
      !values.title && setIsTitleValid(false);
    }
    if (isDescValid === false || isDescValid === true) {
      values.desc && setIsDescValid(true);
      !values.desc && setIsDescValid(false);
    }
    if (isThumbNailValid === false || isThumbNailValid === true) {
      values.thumbNailURL && setIsThumbNailValid(true);
      !values.thumbNailURL && setIsThumbNailValid(false);
    }
    if (isPdfValid === false || isPdfValid === true) {
      values.pdfFileURL && setIsPdfValid(true);
      !values.pdfFileURL && setIsPdfValid(false);
    }
    if (isLinkValild === false || isLinkValild === true) {
      values.linkURL && setIsLinkValid(true);
      !values.linkURL && setIsLinkValid(false);
    }
  }, [values]);

  const checkValidation = (values: Values) => {
    values.title && setIsTitleValid(true);
    !values.title && setIsTitleValid(false);

    values.desc && setIsDescValid(true);
    !values.desc && setIsDescValid(false);

    values.thumbNailURL && setIsThumbNailValid(true);
    !values.thumbNailURL && setIsThumbNailValid(false);

    values.pdfFileURL && setIsPdfValid(true);
    !values.pdfFileURL && setIsPdfValid(false);

    values.linkURL && setIsLinkValid(true);
    !values.linkURL && setIsLinkValid(false);
  };

  return {
    checkValidation,
    isTitleValid,
    isDescValid,
    isThumbNailValid,
    isPdfValid,
    isLinkValild,
    setIsTitleValid,
    setIsDescValid,
    setIsThumbNailValid,
    setIsPdfValid,
    setIsLinkValid,
    allValid: Boolean(
      isTitleValid &&
        isDescValid &&
        isThumbNailValid &&
        isPdfValid &&
        isLinkValild
    ),
  };
};

export default usePortfolioValid;
