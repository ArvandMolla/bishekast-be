enum userRole {
  user = "user",
  superAdmin = "superAdmin",
  admin = "admin",
  moderator1 = "moderator1",
  moderator2 = "moderator2",
  moderator3 = "moderator3",
}

enum userStatus {
  pending = "pending",
  valid = "valid",
}

export interface userInterface {
  name: string;
  email: string;
  password?: string;
  googleId?: string;
  role: userRole;
  status: userStatus;
  avatar?: string;
  createdAt?: Date;
  updatedAt?: Date;
  _id?: string;
  __v?: number;
}

export interface tokenPayload {
  _id: string;
}
