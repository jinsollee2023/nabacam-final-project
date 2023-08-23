export interface User {
  userId: string;
  role: string;
  name: string;
  photoURL: string;
  projectId: string;
  workField?: { workField: string; workSmallField: string };
  workExp?: string;
  contact: { email: string; phone: string };
  singUpDate: string;
  portfolioCount: number;
  resumeProfileIntro?: string;
  resumeExperience?: [
    {
      pastWorkPlace: string;
      pastWorkDuration: { pastWorkEndDate: string; pastWorkStartDate: string };
      pastWorkPosition: string;
    }
  ];
}
export interface IUser extends User {
  title: string;
  deadLine: Date;
  pay: { min: number; max: number };
}

export interface Project {
  projectId?: string;
  title: string;
  desc: string;
  clientId: string;
  freelancerId?: string;
  deadLine: Date;
  pay: { min: number | null; max: number | null };
  status: string;
  volunteer?: string[];
  pendingFreelancer?: string[];
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
