interface User {
  name: string;
  username: string;
  id: string;
}
export interface Blog {
  id: number;
  title: string;
  author: string;
  url: string;
  likes: number;
  user: User | {};
}
