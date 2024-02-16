export interface User {
  id: number;
  name: string;
  email: string;
  email_verified_at: string;
}

export type PageProps<
  T extends Record<string, unknown> = Record<string, unknown>,
> = T & {
  auth: {
    user: User;
  };
};

export interface Comments {
  id: number;
  user_id: number;
  ponder_id: number;
  comment_text: string;
  created_at: string;
  updated_at: string;
  parent_id: number | null;
}
