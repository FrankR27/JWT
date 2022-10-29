import { connectDB } from "../../utils/db";
import User from "../../models/user.model";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { serialize } from "cookie";

connectDB();

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req, res) => {
  switch (req.method) {
    case "GET":
      return res.status(200).json({ message: "Hello World!" });
    case "POST":
      const { email, password } = req.body;

      try {
        // Check if the user already exists
        const user = await User.findOne({ email });
        if (user) {
          return res.status(400).json({ message: "User already exists" });
        }

        // create a new user
        const newUser = new User({
          email,
          // password encrypted
          password: await bcrypt.hash(password, 10),
        });

        // Save user to DB
        const userSaved = await newUser.save();

        // generate token
        const token = jwt.sign(
          {
            id: userSaved._id,
          },
          "123secret",
          {
            expiresIn: 60 * 60 * 24 * 30,
          }
        );

        // serialize token
        const serialized = serialize("token", token, {
          httpOnly: true,
          secure: process.env.NODE_ENV !== "development",
          sameSite: "strict",
          maxAge: 60 * 60 * 24 * 30,
          path: "/",
        });

        // set cookie
        res.setHeader("Set-Cookie", serialized);

        // token
        return res.json({ token });
      } catch (error) {
        console.log(error.message);
      }
    default:
      return res.status(405).json({ message: "Method not allowed" });
  }
};
