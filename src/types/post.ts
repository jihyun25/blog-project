import { CategoryType } from "./category";
import { CommentsInterface } from "./comment";

export interface PostProps {
  id?: string;
  title: string;
  email: string;
  summary: string;
  content: string;
  createAt: string;
  updatedAt?: string;
  uid?: string;
  category?: CategoryType;
  comments?: CommentsInterface[];
}
