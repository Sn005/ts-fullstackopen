import React, { FC, useState, MouseEvent } from "react";
import { Blog as BlogInterface } from "../services/blogs/model";
interface BlogProps {
  blog: Pick<BlogInterface, "title" | "author" | "likes">;
  handleUpdate: (event: MouseEvent<HTMLButtonElement>) => void;
  handleRemove: (event: MouseEvent<HTMLButtonElement>) => void;
  showRemoveButton: boolean;
}

const Blog: FC<BlogProps> = ({
  blog,
  handleUpdate,
  handleRemove,
  showRemoveButton
}) => {
  const [visible, setVisible] = useState(false);
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5
  };
  const BlogConfig = () => (
    <div>
      {blog.likes} Likes <button onClick={handleUpdate}>like</button>
      <br />
      {showRemoveButton && <button onClick={handleRemove}>remove</button>}
    </div>
  );
  return (
    <div style={blogStyle}>
      <div onClick={() => setVisible(!visible)}>
        {blog.title} {blog.author}
      </div>
      {visible && BlogConfig()}
    </div>
  );
};

export default Blog;
