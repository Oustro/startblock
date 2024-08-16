export interface team {
  id: string;
  name: string;
  activated: boolean;
  shareId: string;
  publicId: string;
  type: string;
  jobs: job[];
  whitelist: string[];
}

export interface job {
  id: string;
  title: string;
  location: string;
  salary: string;
  description: string;
  requirements: string;
  questions: string[];
  status: string;
  applicant: number;
  teamId: string;
}

export interface questions {
  question: string;
  type: string;
}

export interface memberList {
  name: string | null;
  id: string | null;
  email: string | null;
  type: string | null;
  gradient: string | null;
}
