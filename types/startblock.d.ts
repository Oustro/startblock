export interface team {
  id: string;
  name: string;
  activated: boolean;
  shareId: string;
  publicId: string;
  type: string;
  jobs: job[];
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
