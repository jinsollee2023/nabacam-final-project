import { BiPhoneCall } from "react-icons/bi";
import { AiOutlineMail } from "react-icons/ai";
import S from "./projectList.styles";
import { FreelancerInfo } from "./ProjectDetailModal";
import { Project } from "src/Types";

interface ProjectCommittedFreelancerProfile {
  committedFreelancer: FreelancerInfo | null;
  project: Project;
}
const ProjectCommittedFreelancerProfile = ({
  committedFreelancer,
}: ProjectCommittedFreelancerProfile) => {
  return (
    <>
      <S.ModalInfoFlexBox>
        <S.ImageBox>
          <img
            src={committedFreelancer?.photoURL}
            alt="프리랜서 프로필 이미지"
          />
        </S.ImageBox>
        <S.ModalInfoColumnBox
          marginLeft="15px"
          style={{ justifyContent: "center" }}
        >
          <S.ModalDetail>{committedFreelancer?.name}</S.ModalDetail>
          <S.ModalDetail>
            {committedFreelancer?.workField.workSmallField}
          </S.ModalDetail>
          <S.ModalDetail style={{ display: "flex", alignItems: "center" }}>
            <BiPhoneCall style={{ marginRight: "5px" }} />
            {committedFreelancer?.contact.phone}
          </S.ModalDetail>
          <S.ModalDetail style={{ display: "flex", alignItems: "center" }}>
            <AiOutlineMail style={{ marginRight: "5px" }} />
            {committedFreelancer?.contact.email}
          </S.ModalDetail>
        </S.ModalInfoColumnBox>
      </S.ModalInfoFlexBox>
    </>
  );
};

export default ProjectCommittedFreelancerProfile;
