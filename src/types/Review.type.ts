export interface Review {
  id: string;
  name: string;
  avatarUrl?: string;
  rating: number; // 1-5
  message: string;
  createdAt: string; // ISO date
  reply?: {
    message: string;
    createdAt: string;
  };
}
