import React, { useEffect, useRef } from "react";
import { S } from "./searchItemBar.styles";
import { MdPersonSearch } from "react-icons/md";
import { useSearchKeywordStore } from "../../../zustand/useSearchKeywordStore";
import useInput from "../../../hooks/useInput";

const SearchItemBar = () => {
  const searchInput = useRef<HTMLInputElement | null>(null);
  const { changeSearchKeyword } = useSearchKeywordStore();

  useEffect(() => {
    searchInput.current?.focus();
  }, []);

  const handleSearchButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    changeSearchKeyword(searchInputProps.value);
  };

  const searchInputProps = useInput("");

  return (
    <S.searchContainer>
      <S.searchForm>
        <S.searchInput
          ref={searchInput}
          type="text"
          {...searchInputProps}
          placeholder="검색어를 입력해주세요."
        ></S.searchInput>
        <S.searchInputButton onClick={handleSearchButtonClick}>
          <MdPersonSearch size="25" />
        </S.searchInputButton>
      </S.searchForm>
    </S.searchContainer>
  );
};

export default SearchItemBar;
