export type User = {
  id: string | number;
  username: string;
  email: string;
  role: string;
  preferredLanguage: string;
  createdAt: string;
};

export type EditUserData = {
  username?: string | null;
  email?: string | null;
};
