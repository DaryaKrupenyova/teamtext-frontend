export interface Document {
  id: number;
  title: string;
  content: string | null;
  created_at: string;
  updated_at: string | null;
  sharing_token: string | null;
}
