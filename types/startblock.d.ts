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
  name: string;
  questions: string[];
  status: string;
  applicant: number;
}

export interface questions {
  question: string;
  type: string;
}
