import { BiPhoneCall } from "react-icons/bi";
import { AiOutlineMail } from "react-icons/ai";
import S from "./projectList.styles";
import { FreelancerInfo } from "./ProjectDetailModal";
import { Project } from "src/Types";
import { toast } from "react-toastify";

interface ProjectCommittedFreelancerProfile {
  committedFreelancer: FreelancerInfo | null;
  project: Project;
}
const ProjectCommittedFreelancerProfile = ({
  committedFreelancer,
}: ProjectCommittedFreelancerProfile) => {
  // 클릭 시 텍스트 클립보드에 복사하기 위해 생성
  const handleCopyClipBoard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast.success("클립보드에 복사되었습니다.");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <S.ModalInfoFlexBox>
        <S.ImageBox>
          <img src={committedFreelancer?.photoURL} alt="프리랜서 프로필 이미지" />
        </S.ImageBox>
        <S.ModalInfoColumnBox marginLeft="15px" style={{ justifyContent: "center" }}>
          <S.ModalDetail>{committedFreelancer?.name}</S.ModalDetail>
          <S.ModalDetail>{committedFreelancer?.workField.workSmallField}</S.ModalDetail>
          <S.ModalDetail
            style={{ display: "flex", alignItems: "center", cursor: "pointer" }}
            onClick={() => handleCopyClipBoard(`${committedFreelancer?.contact.phone}`)}
          >
            <BiPhoneCall style={{ marginRight: "5px" }} />
            {committedFreelancer?.contact.phone}
          </S.ModalDetail>
          <S.ModalDetail
            style={{ display: "flex", alignItems: "center", cursor: "pointer" }}
            onClick={() => handleCopyClipBoard(`${committedFreelancer?.contact.email}`)}
          >
            <AiOutlineMail style={{ marginRight: "5px" }} />
            {committedFreelancer?.contact.email}
          </S.ModalDetail>
        </S.ModalInfoColumnBox>
      </S.ModalInfoFlexBox>
    </>
  );
};

export default ProjectCommittedFreelancerProfile;
