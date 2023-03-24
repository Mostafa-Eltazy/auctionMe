
export interface UserWithInfo {
  id: number;
  email: string;
  username: string;
  profilePicture: string | null;
  createdAt?: Date;
  updatedAt?: Date;
  
}
