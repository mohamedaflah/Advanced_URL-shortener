export interface IUser {
  _id: string;
  email: string;
  username?: string;
  password?: string;
  profileUrl?: string;
  googleId?: string;
  createdAt?: Date;
  updatedAt?: Date;
}
