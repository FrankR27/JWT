import { useState } from "react";
import axios from "axios";

const RegisterPage = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post("/api/register", user);
      console.log(data);
    } catch (error) {
      console.log(error);
    }

    setUser({
      email: "",
      password: "",
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>Register</h1>
      <input
        type="email"
        name="email"
        placeholder="Correo Electrónico"
        onChange={handleChange}
        value={user.email}
      />
      <input
        type="password"
        name="password"
        placeholder="password"
        onChange={handleChange}
        value={user.password}
      />
      <button type="submit">Send</button>
    </form>
  );
};

export default RegisterPage;
