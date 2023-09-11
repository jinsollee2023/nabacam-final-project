export interface User {
  userId: string;
  role: string;
  name: string;
  photoURL: string;
  projectId?: string[];
  workField?: { workField: string; workSmallField: string };
  workExp?: number;
  contact: { email: string; phone: string };
  signUpDate: Date;
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
  pastWorkDuration: { pastWorkEndDate: string; pastWorkStartDate: string };
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
  expectedStartDate: string;
  date?: { startDate: string; endDate: string };
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
  title: string;
  desc: string;
  thumbNailURL: string | File | null;
  pdfFileURL?: string | File;
  linkURL?: string;
}

export interface Review {
  reviewId: string;
  comment: string;
  rating: number;
  freelancerId: string;
  clientId: string;
}

export interface IProjectWithFreelancer extends Project {
  freelancer: User;
  volunteerUser?: Promise<User[]>;
  pendingFreelancerUser?: Promise<User[]>;
}
