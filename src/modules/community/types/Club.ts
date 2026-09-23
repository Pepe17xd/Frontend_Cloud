export type ClubVisibility = "PUBLIC" | "PRIVATE";

export interface Club {
  id: number;
  name: string;
  description: string;
  owner_id: number;
  visibility: ClubVisibility;
}

export interface CreateClubInput {
  name: string;
  description: string;
  visibility: ClubVisibility;
}

export interface PaginatedClubs {
  items: Club[];
  total: number;
  page: number;
  size: number;
  pages: number;
}
