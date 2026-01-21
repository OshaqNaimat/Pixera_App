import mongoose from "mongoose";
const postSchema = mongoose.Schema(
  {
    caption: {
      type: String,
      required: false,
    },
    filter: {
      type: Array,
      required: false,
      default: [
        1.1, 0, 0, 0, 0, 0, 1.1, 0, 0, 0, 0, 0, 1.2, 0, 0, 0, 0, 0, 1, 0,
      ],
    },
    image: {
      type: String,
      required: true,
    },
    user_id:{
      type:mongoose.Schema.Types.ObjectId,
      required:true,
      ref : 'user'
    },
    comment:{
      type:Array,
      default:[]
    },
    likes:{
      type:Array,
      default:[]
    },
  },
  {
    timestamps: true,
  }
);

export const Post = mongoose.model("post", postSchema);
