import React, { useEffect, useRef, useState } from "react";
import { S } from "./searchItemBar.styles";
import { TbUserSearch } from "react-icons/tb";
import { AiOutlineFileSearch, AiOutlineSearch } from "react-icons/ai";
import { useSearchKeywordStore } from "../../../store/useSearchKeywordStore";
import useInput from "../../../hooks/useInput";
import { useTabStore } from "src/store/useTabStore";

const SearchItemBar = () => {
  const searchInput = useRef<HTMLInputElement | null>(null);
  const { changeSearchKeyword } = useSearchKeywordStore();
  const [searchIcon, setSearchIcon] = useState(<div />);
  const { currentTab } = useTabStore();

  useEffect(() => {
    searchInput.current?.focus();
  }, []);

  const handleSearchButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    changeSearchKeyword(searchInputProps.value);
  };
  const searchInputProps = useInput("");

  useEffect(() => {
    if (currentTab === "프리랜서 마켓" || currentTab === "기업페이지") {
      setSearchIcon(<TbUserSearch size="25" />);
    } else if (
      currentTab === "프로젝트 목록" ||
      currentTab === "프로젝트 탐색"
    ) {
      setSearchIcon(<AiOutlineFileSearch size="25" />);
    } else {
      setSearchIcon(<AiOutlineSearch size="25" />);
    }
  }, [currentTab]);

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
          {searchIcon}
        </S.searchInputButton>
      </S.searchForm>
    </S.searchContainer>
  );
};

export default SearchItemBar;
