export interface IUser {
  firstName: string;
  lastName: string;
  email: string;
  activatedAt: Date;
  profilePictureUrl?: string;

  // FE side only
  fullName: string;
}
