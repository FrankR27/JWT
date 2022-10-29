import { useState } from "react";
import axios from "axios";

const New = () => {
  const [posts, setPosts] = useState({
    title: "",
    content: "",
  });

  const handleChange = (e) => {
    setPosts({
      ...posts,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newPost = await axios.post("/api/create", posts);
    console.log(newPost);
    setPosts({
      title: "",
      content: "",
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="title"
        placeholder="Title"
        onChange={handleChange}
      />
      <input
        type="text"
        name="content"
        placeholder="Content"
        onChange={handleChange}
      />
      <button type="submit">Submit</button>
    </form>
  );
};

export default New;
