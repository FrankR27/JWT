import jwt from "jsonwebtoken";
import { connectDB } from "../../utils/db";
import Post from "../../models/post.model";

connectDB();
// eslint-disable-next-line import/no-anonymous-default-export
export default async (req, res) => {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { title, content } = req.body;

  const payload = jwt.decode(req.cookies.token, "123secret");

  const newPost = {
    title,
    content,
    author: payload.id,
  };

  const postSaved = await Post.create(newPost);

  return res.json({ postSaved });
};
