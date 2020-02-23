import { BlogType } from "../models/blog";

export const dummy = (blogs: BlogType[]) => {
  return 1;
};

export const totalLikes = (blogs: BlogType[]): number =>
  blogs.reduce((a, c): number => a + c.likes, 0);

export const favoriteBlog = (blogs: BlogType[]): BlogType =>
  blogs.sort((prev, current) => current.likes - prev.likes)[0];

export const mostBlog = (blogs: BlogType[]) => {
  return [...new Set(blogs.map(blog => blog.author))]
    .map(author => {
      return {
        author,
        blogs: blogs.filter(blog => author === blog.author).length
      };
    })
    .sort((prev, current) => current.blogs - prev.blogs)[0];
};

export const mostLikes = (blogs: BlogType[]) => {
  return [...new Set(blogs.map(blog => blog.author))]
    .map(author => {
      const likes = blogs
        .filter(blog => blog.author === author)
        .reduce((a, c) => a + c.likes, 0);
      return {
        author,
        likes
      };
    })
    .sort((prev, current) => current.likes - prev.likes)[0];
};
