import React, { FC } from "react";
import { Blog as BlogInterface } from "../services/blogs/model";
interface BlogProps {
  blog: Pick<BlogInterface, "title" | "author">;
}
const Blog: FC<BlogProps> = ({ blog }) => (
  <div>
    {blog.title} {blog.author}
  </div>
);

export default Blog;
