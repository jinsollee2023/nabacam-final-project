export interface User {
  userId: string;
  role: string;
  name: string;
  photoURL: string;
  projectId: string;
  workField?: string;
  workExp?: string;
  contact: { email: string; phone: string };
}

export interface Project {
  projectId: string;
  title: string;
  desc: string;
  clientId: string;
  freelancerId: string;
  deadLine: string;
  pay: { min: number; max: number };
  isDone: boolean;
}

export interface Task {
  taskId: string;
  projectId: string;
  title: string;
  status: string;
  deadLine: string;
  importance: number;
}

export interface Portfolio {
  portfolioId: string;
  freelancerId: string;
  thumbNailURL: string;
  title: string;
  desc: string;
  pdfFileURL: string;
}

export interface Review {
  reviewId: string;
  comment: string;
  rating: number;
  freelancerId: string;
  clientId: string;
}

export interface PortfolioIndexMap {
  [freelancerId: string]: number;
}

export interface SearchFreelancerProps {
  onSearch: (keyword: string) => void;
}

export interface FreelancerListProps {
  freelancersData: User[];
}


const Types = () => {
  return <div>Types</div>;
};

export default Types;
