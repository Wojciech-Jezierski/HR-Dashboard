interface Candidate {
  id: string;
  createdAt: date;
  updatedAt: date;
  name: string;
  position: string;
  shortDescription: string;
  longDescription: string;
  logo: string;
  companyName: string;
  select: boolean;
}

export { Candidate };
