import { BiPhoneCall } from "react-icons/bi";
import { AiOutlineMail } from "react-icons/ai";
import S from "./ProjectList.styles";
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
        <S.ModalInfoColumnBox marginLeft="15px">
          <S.ModalDetail marginBottom="3px">
            {committedFreelancer?.name}
          </S.ModalDetail>
          <S.ModalDetail marginBottom="3px">
            {committedFreelancer?.workField.workSmallField}
          </S.ModalDetail>
          <S.ModalDetail marginBottom="3px">
            {committedFreelancer?.resumeProfileIntro}
          </S.ModalDetail>
          <S.ModalDetail
            marginBottom="3px"
            style={{ display: "flex", alignItems: "center" }}
          >
            <BiPhoneCall />
            {committedFreelancer?.contact.phone}
          </S.ModalDetail>
          <S.ModalDetail
            marginBottom="3px"
            style={{ display: "flex", alignItems: "center" }}
          >
            <AiOutlineMail />
            {committedFreelancer?.contact.email}
          </S.ModalDetail>
        </S.ModalInfoColumnBox>
      </S.ModalInfoFlexBox>
    </>
  );
};

export default ProjectCommittedFreelancerProfile;
