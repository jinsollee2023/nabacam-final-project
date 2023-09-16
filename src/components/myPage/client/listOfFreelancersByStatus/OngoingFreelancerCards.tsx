import React, { useState, useRef } from "react";
import { S } from "./listOfFreelancersByStatus.styles";
import Modal from "../../../modal/Modal";
import OngoingFreelancerInfoModal from "./OngoingFreelancerInfoModal";
import dayjs from "dayjs";
import { FiPhoneCall, FiMail } from "react-icons/fi";
import { IUser, Project, User } from "../../../../Types";
import { toast } from "react-toastify";

interface OngoingFreelancerCardsProps {
  user: User;
  project: Project;
}

const OngoingFreelancerCards = ({ user, project }: OngoingFreelancerCardsProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedFreelancer, setSelectedFreelancer] = useState<IUser | null>(null);

  // useRef를 이용하여 span 태그에 접근
  const copyPhone = useRef<HTMLSpanElement>(null);
  const copyEmail = useRef<HTMLSpanElement>(null);

  const onClickCopyPhone = () => {
    copyPhone.current?.click();
  };

  const onClickCopyEmail = () => {
    copyEmail.current?.click();
  };

  // 클릭 시 텍스트 클립보드에 복사하기 위해 생성
  const handleCopyClipBoard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast.success("클립보드에 복사되었습니다.");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <S.Profile>
        <S.ProfileContent>
          <S.ContentContainer>
            <div>
              <S.ProfileContents>
                <S.NameAndWorkFieldWrapper>
                  <S.Name>{user.name}</S.Name>

                  <S.WorkField>{user.workField?.workField}</S.WorkField>
                </S.NameAndWorkFieldWrapper>
                <S.WorkSmallFieldAndWorkExp>
                  {user.workField?.workSmallField} {user.workExp}
                  년차
                </S.WorkSmallFieldAndWorkExp>
              </S.ProfileContents>
              <S.ContactBox>
                <FiPhoneCall size={18} onClick={onClickCopyPhone} cursor="pointer" />
                <S.Contact
                  onClick={() => handleCopyClipBoard(`${user.contact.phone}`)}
                  ref={copyPhone}
                >
                  {user.contact.phone}
                </S.Contact>
              </S.ContactBox>
              <S.ContactBox>
                <FiMail size={18} onClick={onClickCopyEmail} cursor="pointer" />
                <S.Contact
                  onClick={() => handleCopyClipBoard(`${user.contact.email}`)}
                  ref={copyEmail}
                >
                  {user.contact.email}
                </S.Contact>
              </S.ContactBox>
            </div>
          </S.ContentContainer>
          <S.Line />
          <S.ProjectTitle>진행 중인 프로젝트</S.ProjectTitle>
          <S.ProjectSubTitle>{project.title}</S.ProjectSubTitle>
          <S.ProjectDate>{dayjs(project.date?.startDate).format("YYMMDD")} ~</S.ProjectDate>
          <S.DetailButton
            onClick={() => {
              setSelectedFreelancer(user);
              setIsModalOpen(!isModalOpen);
            }}
          >
            자세히 보기
          </S.DetailButton>
          {isModalOpen && selectedFreelancer && selectedFreelancer.userId === user.userId ? (
            <Modal setIsModalOpen={setIsModalOpen}>
              <OngoingFreelancerInfoModal user={user} project={project} />
            </Modal>
          ) : null}
        </S.ProfileContent>
      </S.Profile>
    </>
  );
};

export default OngoingFreelancerCards;
