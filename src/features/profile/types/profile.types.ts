export interface UserProfile {
  name: string;
  email: string;
  phone: string;
}

export interface UpdateProfileResponse {
  message: string;
  user: UserProfile;
}
