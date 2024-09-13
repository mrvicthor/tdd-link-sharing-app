import { Schema, model, Types } from "mongoose";

interface ILink {
  _id: Types.ObjectId;
  title: string;
  url: string;
  owner: Types.ObjectId;
}

const linkSchema = new Schema<ILink>(
  {
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: { type: String, required: true },
    url: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

export const LinkModel = model<ILink>("Link", linkSchema);
