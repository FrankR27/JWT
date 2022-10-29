import { models, model, Schema } from "mongoose";

const postSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

export default models.Post || model("Post", postSchema);
