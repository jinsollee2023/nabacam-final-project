import { Project } from "../../../Types";
import S from "./projectList.styles";
import { useEffect, useState } from "react";
import { getFreelancer } from "src/api/User";
import ProjectCommittedFreelancerProfile from "./ProjectCommittedFreelancerProfile";
import { useUserStore } from "src/store/useUserStore";
import { HiOutlinePaperAirplane } from "react-icons/hi";
import { useRoomStore } from "src/store/useRoomStore";
import supabase from "src/config/supabaseClient";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export interface ProjectDetailModalProps {
  project: Project;
  companyName?: string;
}
export interface FreelancerInfo {
  name: string;
  contact: {
    email: string;
    phone: string;
  };
  workField: {
    workField?: string;
    workSmallField: string;
  };
  projectId: string;
  resumeProfileIntro: string;
  photoURL: string;
}

const ProjectDetailModal = ({
  project,
  companyName,
}: ProjectDetailModalProps) => {
  const [committedFreelancer, setCommittedFreelancer] =
    useState<FreelancerInfo | null>(null);

  const navigate = useNavigate();
  const { userRole, user: DMfreelancer } = useUserStore();
  const { setSelectedRoom, setCreatedRoomId } = useRoomStore();
  // sender (freelancer)
  const DMfreelancerId = DMfreelancer.userId;
  const DMfreelancerName = DMfreelancer.name;
  // receiver (client)
  const DMclientId = project.clientId;
  const DMclientName = `${companyName} ${project.manager.team}팀 ${project.manager.name}님`;
  const projectId = project.projectId;

  console.log("project==>", project);
  const fetchCommittedFreelancer = async () => {
    const userId = project.freelancerId!;
    const freelancer = await getFreelancer(userId);
    setCommittedFreelancer(freelancer);
  };
  useEffect(() => {
    fetchCommittedFreelancer();
  }, [project]);

  const payUnitConversion = (pay: number | string) => {
    if (pay === "상의 후 결정") {
      return pay;
    } else {
      const convertedPay = (pay as number) * 10000;
      return convertedPay.toLocaleString("ko-KR") + "₩";
    }
  };
  //=======================================================================//
  const handleCreateRoom = async () => {
    // 방 생성 + 구성원 집어넣음
    const { data, error } = await supabase.rpc("create_room2", {
      roomname: `${DMfreelancerName}, ${DMclientName}`,
      user_id: DMfreelancerId,
      receiver_id: DMclientId,
      receiver_id_projectid: projectId,
    });

    if (data) {
      const room_id = data.room_id;

      setCreatedRoomId(room_id);
      setSelectedRoom(data);
    }
  };

  const checkDuplicateRoomId = async () => {
    const { data, error } = await supabase
      .from("room_participants")
      .select("room_id")
      .match({
        receiver_id: DMclientId,
        receiver_id_projectid: projectId,
        user_id: DMfreelancerId,
      })
      .single();

    return data ? data.room_id : null;
  };

  const sendDM = async () => {
    // 중복 방 여부 확인
    const result = await checkDuplicateRoomId();
    console.log("75", result);

    if (result !== null) {
      console.log(
        "이미 생성된 방이 있습니다. 해당 채팅방으로 이동은 구현중입니다."
      );

      navigate("/chat");
      return;
    }

    // 중복 없을 경우 새로운 방 생성
    console.log("채팅 내역이 없습니다.");
    handleCreateRoom();
    navigate("/chat");
  };
  //=======================================================================//

  return (
    <S.DetailModalContainer>
      <S.ModalTitle fontSize="20px" marginBottom="30px">
        {project.title}
      </S.ModalTitle>

      <S.ModalInfoColumnBox>
        <S.ModalTitle marginBottom="5px">
          <label htmlFor="projectTitle">프로젝트 이름</label>
        </S.ModalTitle>
        <S.ModalDetail id="projectTitle" marginBottom="3px">
          {project.title}
        </S.ModalDetail>
        <S.ModalTitle marginTop="7px" marginBottom="3px">
          <label htmlFor="projectDesc">프로젝트 설명</label>
        </S.ModalTitle>
        <S.ModalDetailDesc id="projectDesc">{project.desc}</S.ModalDetailDesc>
      </S.ModalInfoColumnBox>
      <S.ModalLine />
      {/* --------------------------------------------------------- */}
      <S.ModalTitle marginBottom="10px">
        <label htmlFor="projectQualification">모집 조건</label>
      </S.ModalTitle>
      <S.ModalInfoFlexBox>
        <S.ModalInfoColumnBox>
          <S.ModalDetail>경력</S.ModalDetail>
          <S.ModalDetail color="var(--main-blue)">
            {project.qualification}년차 이상
          </S.ModalDetail>
        </S.ModalInfoColumnBox>
        <S.ModalInfoColumnBox marginLeft="30%">
          <S.ModalDetail marginBottom="0px">분야</S.ModalDetail>
          <S.ModalDetail color="var(--main-blue)" marginBottom="0px">
            {project.category}
          </S.ModalDetail>
        </S.ModalInfoColumnBox>
      </S.ModalInfoFlexBox>
      <S.ModalLine />
      <S.ModalTitle marginBottom="10px">
        <label htmlFor="projectInfo">프로젝트 설정</label>
      </S.ModalTitle>
      <S.ModalInfoColumnBox>
        <S.ModalDetail>시작 예정일</S.ModalDetail>
        <S.ModalInfoFlexBox style={{ alignItems: "center" }}>
          <S.ModalDetail color="var(--main-blue)">
            {String(project.expectedStartDate)}
          </S.ModalDetail>
        </S.ModalInfoFlexBox>

        <S.ModalDetail marginTop="10px" marginBottom="2px">
          담당자
        </S.ModalDetail>
        <S.ModalDetail color="var(--main-blue)">
          {project.manager.team}팀 {project.manager.name}
        </S.ModalDetail>
        <S.ModalDetail style={{ cursor: "pointer", color: "dimgray" }}>
          <HiOutlinePaperAirplane
            onClick={() => sendDM()}
            size={17}
            style={{ transform: "rotate(45deg)", cursor: "pointer" }}
          />
          메세지 보내기
        </S.ModalDetail>

        <S.ModalDetail marginTop="10px" marginBottom="2px">
          급여
        </S.ModalDetail>

        <S.ModalInfoFlexBox style={{ alignItems: "center" }}>
          <p
            style={{
              fontSize: "14px",
              color: "var(--darker-gray)",
            }}
          >
            최소
          </p>
          <S.ModalDetail
            color="var(--main-blue)"
            marginRight="30px"
            marginLeft="15px"
          >
            {payUnitConversion(project.pay.min as number)}
          </S.ModalDetail>
          <p
            style={{
              fontSize: "14px",
              color: "var(--darker-gray)",
              marginRight: "15px",
            }}
          >
            최대
          </p>
          <S.ModalDetail color="var(--main-blue)">
            {payUnitConversion(project.pay.max as number)}
          </S.ModalDetail>
        </S.ModalInfoFlexBox>
      </S.ModalInfoColumnBox>

      {committedFreelancer && userRole === "client" && (
        <>
          <S.ModalLine />
          <S.ModalTitle marginBottom="10px">
            <label htmlFor="volunteeredFreelancer">투입한 프리랜서</label>
          </S.ModalTitle>

          <ProjectCommittedFreelancerProfile
            committedFreelancer={committedFreelancer}
            project={project}
          />
        </>
      )}
    </S.DetailModalContainer>
  );
};

export default ProjectDetailModal;
