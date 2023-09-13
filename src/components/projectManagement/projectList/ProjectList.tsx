import React from "react";
import ProjectCard from "./ProjectCard";
import { RiAddBoxLine } from "react-icons/ri";
import Modal from "../../modal/Modal";
import AddProjectModal from "./AddProjectModal";
import { useProjectStore } from "../../../store/useProjectStore";
import S from "./ProjectListStyles";
import { useEffect, useState } from "react";
import { useUserStore } from "../../../store/useUserStore";
import SearchItemBar from "../../../components/common/searchItemBar/SearchItemBar";
import SortProjects from "./SortProjects";
import { queryClient } from "../../../App";
import { useSearchKeywordStore } from "../../../store/useSearchKeywordStore";
import { Project } from "../../../Types";
import { useProjectValuesStore } from "src/store/useProjectValuesStore";
import { toast } from "react-toastify";
import useValidation from "src/hooks/useValidation";
import useProjectOfClientBySortQueries from "src/hooks/queries/useProjectOfClientBySortQueries";
import { useInView } from "react-intersection-observer";

export interface Errors {
  title: null | string;
  desc: null | string;
  category: null | string;
  qualification: null | string;
  expectedStartDate: null | string;
  manager: null | string;
  pay: null | string;
}

const ProjectList = () => {
  const [ref, inView] = useInView();
  const { userId } = useUserStore();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedselectOption, setSelectedselectOption] = useState("전체보기");
  const [selectedSortLabel, setSelectedSortLabel] = useState("최신순");
  const { projectsOfClient, addProjectMutation, fetchNextPage, hasNextPage } =
    useProjectOfClientBySortQueries({
      currentUserId: userId,
      sortLabel: selectedSortLabel,
    });
  const { newProject } = useProjectStore();
  const { searchKeyword, changeSearchKeyword } = useSearchKeywordStore();
  const [filteredProjects, setFilteredProjects] = useState<Project[][]>([]);
  const [addSubmitButtonClicked, setAddSubmitButtonClicked] = useState(false);
  const { values, changeValues } = useProjectValuesStore();
  const { validateDate, validateSelect, validatePay, validateWorkExp, validateInput } =
    useValidation();
  const initialErrors: Errors = {
    title: null,
    desc: null,
    category: null,
    qualification: null,
    expectedStartDate: null,
    manager: null,
    pay: null,
  };
  const [errors, setErrors] = useState(initialErrors);

  const validateAddProject = () => {
    const titleError = validateInput("프로젝트 제목", newProject.title);
    const descError = validateInput("프로젝트 설명", newProject.desc);
    const categoryError = validateSelect("프로젝트 설명", values.category as string);
    const qualificationError = validateWorkExp(String(newProject.qualification));
    const expectedStartDateError = validateDate("시작예정일", newProject.expectedStartDate);
    const managerError = validateSelect("담당자", newProject.manager.name);
    const payError = validatePay(newProject.pay.min, newProject.pay.max);
    setErrors({
      title: titleError,
      desc: descError,
      category: categoryError,
      qualification: qualificationError,
      expectedStartDate: expectedStartDateError,
      manager: managerError,
      pay: payError,
    });
  };

  const projectAllValid =
    errors.title === "" &&
    errors.desc === "" &&
    errors.category === "" &&
    errors.qualification === "" &&
    errors.expectedStartDate === "" &&
    errors.manager === "" &&
    errors.pay === "";

  useEffect(() => {
    if (projectAllValid && addSubmitButtonClicked) {
      addProjectMutation.mutate(newProject);
      setIsAddModalOpen(false);
      setAddSubmitButtonClicked(false);
      toast.success("프로젝트가 게시되었습니다.");
    } else setAddSubmitButtonClicked(false);
  }, [errors, addSubmitButtonClicked]);

  const addProjectButtonHandler = () => {
    validateAddProject();
    setAddSubmitButtonClicked(true);
  };

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView]);

  useEffect(() => {
    if (projectsOfClient?.pages) {
      const filteredprojectList = projectsOfClient?.pages.map((page) => {
        return page.projects.filter((project) => {
          const lowerCaseSearch = String(searchKeyword).toLowerCase();
          return project?.title?.toLowerCase().includes(lowerCaseSearch);
        });
      });
      setFilteredProjects(filteredprojectList!);
    }
  }, [projectsOfClient, searchKeyword]);

  useEffect(() => {
    queryClient.invalidateQueries(["projectList", selectedSortLabel]);
  }, [selectedSortLabel]);

  useEffect(() => {
    changeSearchKeyword("");
  }, []);

  const handleSort = (label: string) => {
    setSelectedselectOption(label);
  };

  const availableClose =
    values.title === "" &&
    values.desc === "" &&
    values.category === "" &&
    values.minPay === "" &&
    values.maxPay === "" &&
    values.expectedStartDate === "" &&
    values.manager.name === "" &&
    values.manager.contact.email === "" &&
    values.manager.contact.phone === "" &&
    values.manager.team === "" &&
    values.qualification === null;

  const beforeProgressProjects = filteredProjects?.map((page) =>
    page.filter((project) => project.status === "진행 전")
  );

  const onProgressProjects = filteredProjects?.map((page) =>
    page.filter((project) => project.status === "진행 중")
  );

  const DoneProjects = filteredProjects?.map((page) =>
    page.filter((project) => project.status === "진행 완료")
  );

  const renderProjects = () => {
    let projectsToRender: Project[][] = [];
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
        {projectsToRender?.map((page, idx) => (
          <React.Fragment key={idx}>
            {page.map((project) => (
              <ProjectCard
                key={project.projectId}
                project={project}
                errors={errors}
                setErrors={setErrors}
              />
            ))}
          </React.Fragment>
        ))}
      </>
    );
  };

  const addProjectModalOpenHandler = () => {
    setIsAddModalOpen(true);
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
    setErrors({
      title: null,
      desc: null,
      category: null,
      qualification: null,
      expectedStartDate: null,
      manager: null,
      pay: null,
    });
  };

  return (
    <>
      {projectsOfClient?.pages && projectsOfClient?.pages.length > 0 ? (
        <>
          <S.SearchSortWrapper>
            <SearchItemBar />
            <SortProjects handleSort={handleSort} />
          </S.SearchSortWrapper>
          <S.SearchSortBtnWrapper>
            <S.SearchSortBtnBox>
              <S.SearchSortBtn
                onClick={() => setSelectedSortLabel("최신순")}
                className={selectedSortLabel === "최신순" ? "selected" : ""}
              >
                최신순
              </S.SearchSortBtn>
              <S.SearchSortBtn
                onClick={() => setSelectedSortLabel("오래된순")}
                className={selectedSortLabel === "오래된순" ? "selected" : ""}
              >
                오래된순
              </S.SearchSortBtn>
            </S.SearchSortBtnBox>
          </S.SearchSortBtnWrapper>
        </>
      ) : (
        <p>등록된 프로젝트가 없습니다.</p>
      )}
      <S.ProjectContainer>
        {projectsOfClient && renderProjects()}
        <div ref={ref}></div>
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
              <S.ModalPostBtn onClick={addProjectButtonHandler}>프로젝트 게시하기</S.ModalPostBtn>
            </>
          }
          availableClose={availableClose}
        >
          <AddProjectModal errors={errors} setErrors={setErrors} />
        </Modal>
      )}
    </>
  );
};

export default ProjectList;
