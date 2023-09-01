import React, { useEffect, useState } from "react";
import {
  Values,
  useProjectValuesStore,
} from "../../src/zustand/useProjectValuesStore";

const useProjectValid = () => {
  const { values } = useProjectValuesStore();

  const [isTitleValid, setIsTitleValid] = useState<boolean | null>(
    values.title ? true : null
  );
  const [isDescValid, setIsDescValid] = useState<boolean | null>(
    values.desc ? true : null
  );
  const [isCategoryValid, setIsCategoryValid] = useState<boolean | null>(
    values.category ? true : null
  );
  const [isQualificationValid, setIsQualificationValid] = useState<
    boolean | null
  >(values.qualification ? true : null);
  const [isExpectedStartDateValid, setIsExpectedStartDateValid] = useState<
    boolean | null
  >(values.expectedStartDate ? true : null);
  const [isManagerValid, setIsManagerValid] = useState<boolean | null>(
    values.manager ? true : null
  );
  const [isMaxPayValid, setIsMaxPayValid] = useState<boolean | null>(
    values.maxPay ? true : null
  );

  // console.log(
  //   "밸리드",
  //   values
  //   isTitleValid,
  //   isDescValid,
  //   isCategoryValid,
  //   isQualificationValid,
  //   isDeadLineValid,
  //   isManagerValid,
  //   isMaxPayValid
  // );

  const checkValidation = (values: Values) => {
    values.title && setIsTitleValid(true);
    !values.title && setIsTitleValid(false);

    values.desc && setIsDescValid(true);
    !values.desc && setIsDescValid(false);

    values.category && setIsCategoryValid(true);
    !values.category && setIsCategoryValid(false);

    values.qualification && setIsQualificationValid(true);
    !values.qualification && setIsQualificationValid(false);

    values.expectedStartDate && setIsExpectedStartDateValid(true);
    !values.expectedStartDate && setIsExpectedStartDateValid(false);

    values.manager.name && setIsManagerValid(true);
    !values.manager.name && setIsManagerValid(false);

    if (
      !(values.minPay == "상의 후 결정") &&
      !(values.maxPay == "상의 후 결정")
    ) {
      values.maxPay > values.minPay && setIsMaxPayValid(true);
      !(values.maxPay > values.minPay) && setIsMaxPayValid(false);
    } else {
      setIsMaxPayValid(true);
    }
    return (
      isTitleValid &&
      isDescValid &&
      isCategoryValid &&
      isQualificationValid &&
      isExpectedStartDateValid &&
      isManagerValid &&
      isMaxPayValid
    );
  };

  return {
    checkValidation,
    isTitleValid,
    isDescValid,
    isCategoryValid,
    isQualificationValid,
    isExpectedStartDateValid,
    isManagerValid,
    isMaxPayValid,
    setIsTitleValid,
    setIsDescValid,
    setIsCategoryValid,
    setIsQualificationValid,
    setIsExpectedStartDateValid,
    setIsManagerValid,
    setIsMaxPayValid,
  };
};

export default useProjectValid;
