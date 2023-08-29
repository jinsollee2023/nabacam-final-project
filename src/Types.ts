export interface User {
  userId: string;
  role: string;
  name: string;
  photoURL: string;
  projectId?: string;
  workField?: { workField: string; workSmallField: string };
  workExp?: string;
  contact: { email: string; phone: string };
  singUpDate: Date;
  portfolioCount: number;
  resumeProfileIntro?: string;
  resumeExperience?: ResumeExperience[];
  members?: Member[];
}

export interface ResumeExperience {
  experienceId: string;
  pastWorkField: string;
  pastEmploymentType: string;
  pastWorkPlace: string;
  pastWorkDuration: { pastWorkEndDate: Date; pastWorkStartDate: Date };
  pastWorkPosition: string;
}

export interface Member {
  name: string;
  team: string;
  contact: {
    email: string;
    phone: string;
  };
}

export interface IUser extends User {
  title?: string;
  date?: { startDate: string; endDate: string };
  pay?: { min: number | string; max: number | string };
}

export interface Project {
  projectId?: string;
  created_at?: Date;
  category?: string;
  title: string;
  desc: string;
  clientId: string;
  freelancerId?: string;
  date: { startDate: string; endDate: string };
  pay: { min: number | string; max: number | string };
  status: string;
  volunteer?: string[];
  SuggestedFreelancers?: string[];
  pendingFreelancer?: string[];
  manager: {
    name: string;
    team: string;
    contact: { email: string; phone: string };
  };
  qualification: number;
}

export interface Task {
  taskId: string;
  projectId: string;
  title: string;
  status: string;
  deadLine: string;
  importance: number;
  taskDate: Date;
  created_at: Date;
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

export interface IProjectWithFreelancer extends Project {
  freelancerPromise: Promise<User>;
  freelancer: User;
  volunteerUser?: Promise<User[]>;
  pendingFreelancerUser?: Promise<User[]>;
}
