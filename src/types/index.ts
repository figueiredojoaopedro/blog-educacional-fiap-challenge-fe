export interface Post {
  id: string;
  title: string;
  content: string;
  author: string;
  summary: string;
  createdAt: string;
  updatedAt: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: "teacher" | "student";
}
