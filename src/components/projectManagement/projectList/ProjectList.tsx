import React from "react";
import ProjectCard from "./ProjectCard";
import { RiAddBoxLine } from "react-icons/ri";
import Modal from "../../modal/Modal";
import AddProjectModal from "./AddProjectModal";
import { useProjectStore } from "../../../zustand/useProjectStore";
import S from "./ProjectListStyles";
import { useEffect, useState } from "react";
import { useUserStore } from "../../../zustand/useUserStore";
import useProjectsQueries from "../../../hooks/useProjectsQueries";
import SearchItemBar from "../../../components/common/searchItemBar/SearchItemBar";
import SortProjects from "./SortProjects";
import { queryClient } from "../../../App";
import { useSearchKeywordStore } from "../../../zustand/useSearchKeywordStore";
import { Project } from "../../../Types";
import { useProjectValuesStore } from "src/zustand/useProjectValuesStore";
import useProjectValid from "src/hooks/useProjectValid";

const ProjectList = () => {
  const { userId } = useUserStore();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedselectOption, setSelectedselectOption] = useState("전체보기");
  const [selectedSortLabel, setSelectedSortLabel] = useState("전체보기");
  const { projectsOfClient, addProjectMutation } = useProjectsQueries({
    currentUserId: userId,
    sortLabel: selectedSortLabel,
  });
  const { newProject } = useProjectStore();
  const { searchKeyword, changeSearchKeyword } = useSearchKeywordStore();
  const [filteredProjects, setFilteredProjects] = useState<Project[]>(
    projectsOfClient!
  );
  const [addSubmitButtonClicked, setAddSubmitButtonClicked] = useState(false);
  const { values, changeValues } = useProjectValuesStore();
  const {
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
    allValid,
  } = useProjectValid();

  useEffect(() => {
    if (projectsOfClient) {
      const filteredprojectList = projectsOfClient?.filter((project) => {
        const lowerCaseSearch = String(searchKeyword).toLowerCase();
        return project?.title?.toLowerCase().includes(lowerCaseSearch);
      });
      setFilteredProjects(filteredprojectList);
    }
  }, [projectsOfClient, searchKeyword]);

  useEffect(() => {
    if (allValid && addSubmitButtonClicked) {
      addProjectMutation.mutate(newProject);
      setAddSubmitButtonClicked(false);
      setIsAddModalOpen(false);
    } else if (!allValid) {
      setAddSubmitButtonClicked(false);
    }
  }, [allValid, addSubmitButtonClicked]);

  useEffect(() => {
    queryClient.invalidateQueries(["projectList", selectedSortLabel]);
  }, [selectedSortLabel]);

  useEffect(() => {
    changeSearchKeyword("");
  }, []);

  const handleSort = (label: string) => {
    setSelectedselectOption(label);
  };

  const addProjectButtonHandler = () => {
    const shouldAddProject = window.confirm("프로젝트를 게시하시겟습니까?");
    if (shouldAddProject) {
      checkValidation(values);
      setAddSubmitButtonClicked(true);
      alert("프로젝트가 게시되었습니다.");
    } else {
      alert("필수사항을 입력해주세요");
    }
  };

  const beforeProgressProjects = filteredProjects?.filter(
    (project) => project.status === "진행 전"
  );

  const onProgressProjects = filteredProjects?.filter(
    (project) => project.status === "진행 중"
  );

  const DoneProjects = filteredProjects?.filter(
    (project) => project.status === "진행 완료"
  );

  const renderProjects = () => {
    let projectsToRender: Project[] = [];
    if (selectedselectOption === "전체보기") {
      projectsToRender = filteredProjects;
    } else if (selectedselectOption === "진행 전") {
      projectsToRender = beforeProgressProjects;
    } else if (selectedselectOption === "진행 중") {
      projectsToRender = onProgressProjects;
    } else if (selectedselectOption === "진행 완료") {
      projectsToRender = DoneProjects;
    }
    return (
      <>
        {projectsToRender?.map((project) => (
          <ProjectCard key={project.projectId} project={project} />
        ))}
      </>
    );
  };

  const addProjectModalOpenHandler = () => {
    setIsAddModalOpen(true);
    setAddSubmitButtonClicked(false);
    setIsTitleValid(null);
    setIsDescValid(null);
    setIsCategoryValid(null);
    setIsQualificationValid(null);
    setIsExpectedStartDateValid(null);
    setIsManagerValid(null);
    setIsMaxPayValid(null);
    changeValues({
      title: "",
      desc: "",
      category: "",
      qualification: null,
      expectedStartDate: "",
      manager: { name: "", team: "", contact: { email: "", phone: "" } },
      minPay: "",
      maxPay: "",
    });
  };

  return (
    <>
      {projectsOfClient && projectsOfClient.length > 0 ? (
        <>
          <S.SearchSortWrapper>
            <SearchItemBar />
            <SortProjects handleSort={handleSort} />
          </S.SearchSortWrapper>
          <S.SearchSortBtnBox>
            <S.SearchSortBtn
              onClick={() => setSelectedSortLabel("최신순")}
              style={{ marginRight: "5px" }}
            >
              최신순
            </S.SearchSortBtn>
            <S.SearchSortBtn onClick={() => setSelectedSortLabel("오래된순")}>
              오래된순
            </S.SearchSortBtn>
          </S.SearchSortBtnBox>
        </>
      ) : (
        <p>등록된 프로젝트가 없습니다.</p>
      )}
      <S.ProjectContainer>
        {projectsOfClient && renderProjects()}
      </S.ProjectContainer>

      <S.ProjectSpanBtn onClick={addProjectModalOpenHandler}>
        <RiAddBoxLine size="23" color="white" style={{ marginRight: "10px" }} />
        프로젝트 게시하기
      </S.ProjectSpanBtn>

      {isAddModalOpen && (
        <Modal
          setIsModalOpen={setIsAddModalOpen}
          buttons={
            <>
              <S.ModalPostBtn onClick={addProjectButtonHandler}>
                프로젝트 게시하기
              </S.ModalPostBtn>
            </>
          }
        >
          <AddProjectModal
            isTitleValid={isTitleValid}
            isDescValid={isDescValid}
            isCategoryValid={isCategoryValid}
            isQualificationValid={isQualificationValid}
            isDeadLineValid={isExpectedStartDateValid}
            isManagerValid={isManagerValid}
            isMaxPayValid={isMaxPayValid}
          />
        </Modal>
      )}
    </>
  );
};

export default ProjectList;
