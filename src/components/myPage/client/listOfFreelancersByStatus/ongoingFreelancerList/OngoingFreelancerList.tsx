import { useUserStore } from "../../../../../store/useUserStore";
import { S } from "../listOfFreelancersByStatus.style";
import OngoingFreelancerCards from "./OngoingFreelancerCards";
import useOngoingProjectOfClientQueries from "src/hooks/queries/useOngoingProjectOfClientQueries";

const OngoingFreelancerList = () => {
  // const [page, setPage] = useState(1);

  const { userId } = useUserStore();
  const { freelancersWithOngoingProjects } = useOngoingProjectOfClientQueries({
    currentUserId: userId,
    // page,
  });
  // console.log(freelancersWithOngoingProjects);

  // const target = React.useRef() as React.MutableRefObject<HTMLDivElement>;

  // useEffect(() => {
  //   if (!target.current) return;
  //   observer.observe(target.current);
  // }, []);

  // const options = {
  //   threshold: 1.0,
  // };

  // const callback = () => {
  //   setPage(page + 1);
  // };

  // const observer = new IntersectionObserver(callback, options);

  if (
    !freelancersWithOngoingProjects ||
    freelancersWithOngoingProjects.length === 0
  ) {
    return <span>진행 중인 프리랜서가 없습니다.</span>;
  }

  return (
    <>
      <S.OngoingFreelancerlistContainer>
        {freelancersWithOngoingProjects?.map((project) => (
          <S.ListsBox key={`${project.projectId}-${project.freelancer.userId}`}>
            <OngoingFreelancerCards
              key={`${project.projectId}-${project.freelancer.userId}`}
              user={project.freelancer}
              project={project}
            />
          </S.ListsBox>
        ))}
        {/* <div ref={target}></div> */}
      </S.OngoingFreelancerlistContainer>
    </>
  );
};

export default OngoingFreelancerList;
