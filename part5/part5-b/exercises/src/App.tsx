import React, { useState, useEffect, FC, FormEvent, MouseEvent } from "react";
import loginService from "./services/login";
import { AuthResponse } from "./services/login/model";
import blogService from "./services/blogs";
import { Blog as BlogInterface } from "./services/blogs/model";
import Notification from "./components/Notification";
import Blog from "./components/Blog";
import Togglable, { TogglableHandler } from "./components/Togglable";

const App: FC = () => {
  const [blogs, setBlogs] = useState<BlogInterface[]>([]);
  const [user, setUser] = useState<AuthResponse | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");
  const updateBlog = async (blog: BlogInterface) => {
    const newBlog = { ...blog, likes: blog.likes + 1 };
    const updated = await blogService.update(newBlog);
    const updatedBlogs = blogs
      .filter(b => b.id !== blog.id)
      .concat(updated)
      .sort((a, b) => b.likes - a.likes);

    setBlogs(updatedBlogs);
  };
  const removeBlog = async (blog: BlogInterface) => {
    const option = window.confirm(`remove ${blog.title} by ${blog.author}`);
    // if (option) {
    //   await blogService.remove(blog.id);
    // }
    // setBlogs(blogs.filter(b => b.id !== blog.id));
  };
  const rows = () =>
    blogs.map(blog => (
      <Blog
        key={blog.id}
        blog={blog}
        handleUpdate={() => updateBlog(blog)}
        handleRemove={() => removeBlog(blog)}
        showRemoveButton={true}
      />
    ));
  const handleLogin = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const user = await loginService.login({
        username,
        password
      });
      window.localStorage.setItem("loggedNoteappUser", JSON.stringify(user));
      blogService.setToken(user.token);
      setUser(user);
      setUsername("");
      setPassword("");
    } catch (exception) {
      setErrorMessage("Wrong credentials");
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };
  const handleLogout = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    console.log("logout");
    window.localStorage.removeItem("loggedNoteappUser");
  };
  const setNotesHook = () => {
    console.log("effect");
    const asyncSetNotes = async () => {
      console.log("promise fulfilled");
      const initialBlogs = await blogService.getAll();
      setBlogs(initialBlogs);
    };
    asyncSetNotes();
  };
  const setTokenHook = () => {
    const loggedUserJSON = window.localStorage.getItem("loggedNoteappUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  };
  useEffect(setTokenHook, []);
  useEffect(setNotesHook, []);
  const loginForm = () => (
    <>
      <h2>Log in to application</h2>
      <form onSubmit={handleLogin}>
        <div>
          username
          <input
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
          <input
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">login</button>
      </form>
    </>
  );
  const addBlog = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const blogObject: BlogInterface = {
      title,
      url,
      author,
      id: blogs.length + 1,
      likes: 0,
      user: {}
    };
    const result = await blogService.create(blogObject);
    console.log(result);
    setBlogs([...blogs, result]);
    setTitle("");
    setAuthor("");
    setUrl("");
  };

  const blogFormRef = React.createRef<TogglableHandler>();
  const blogForm = () => (
    <Togglable buttonLabel="new blog" ref={blogFormRef}>
      <form onSubmit={addBlog}>
        <div>
          title:
          <input
            type="text"
            value={title}
            name="Title"
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author:
          <input
            type="text"
            value={author}
            name="Author"
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          URL:
          <input
            type="text"
            value={url}
            name="URL"
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <button type="submit">create</button>
      </form>
    </Togglable>
  );
  return (
    <div className="App">
      <Notification message={errorMessage} />
      {user === null ? (
        loginForm()
      ) : (
        <div>
          <h2>Blogs</h2>
          <p>
            {user.name} logged in <button onClick={handleLogout}>logout</button>
          </p>
          {blogForm()}
          {rows()}
        </div>
      )}
    </div>
  );
};

export default App;
