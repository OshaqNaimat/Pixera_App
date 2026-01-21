import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../services/api";

const initialState = {
  posts: [],
  myPost: [],
  postSuccess: false,
  postError: false,
  postMessage: "",
  postLoading: false,

  commentLoading: false,
  commentError: false,
  commentSuccess: false,
  commentMessage: "",

  likesLoading: false,
  likesError: false,
  likesSuccess: false,
  likesMessage: "",
};

export const addDaak = createAsyncThunk(
  "posts/add",
  async (postData, thunkapi) => {
    try {
      const res = await api.post(
        `/posts/addPost/${postData.user_id}`,
        postData
      );
      return res.data;
    } catch (error) {
      return thunkapi.rejectWithValue(error.response?.data);
    }
  }
);

export const getDaak = createAsyncThunk(
  "posts/getAll",
  async (_, thunkapi) => {
    try {
      const res = await api.get("/posts/get-post");
      return res.data;
    } catch (error) {
      return thunkapi.rejectWithValue(error.response?.data);
    }
  }
);

export const addCommentData = createAsyncThunk(
  "posts/addComment",
  async (data, thunkapi) => {
    try {
      const res = await api.post(
        `/posts/add-comment/${data.post_id}/${data.user_id}`,
        data
      );
      return res.data;
    } catch (error) {
      return thunkapi.rejectWithValue(error.response?.data);
    }
  }
);

export const addLikeData = createAsyncThunk(
  "posts/addLike",
  async (data, thunkapi) => {
    try {
      const res = await api.post(
        `/posts/add-likes/${data.post_id}/${data.user_id}`
      );
      return res.data;
    } catch (error) {
      return thunkapi.rejectWithValue(error.response?.data);
    }
  }
);

export const getRelaventPosts = createAsyncThunk(
  "posts/getMine",
  async (user_id, thunkapi) => {
    try {
      const res = await api.get(`/posts/get-my-posts/${user_id}`);
      return res.data;
    } catch (error) {
      return thunkapi.rejectWithValue(error.response?.data);
    }
  }
);

const postSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // POSTS
      .addCase(addDaak.pending, (state) => {
        state.postLoading = true;
      })
      .addCase(addDaak.fulfilled, (state, action) => {
        state.postLoading = false;
        state.postSuccess = true;
        state.posts.unshift(action.payload);
      })
      .addCase(addDaak.rejected, (state, action) => {
        state.postLoading = false;
        state.postError = true;
        state.postMessage = action.payload;
      })

      .addCase(getDaak.fulfilled, (state, action) => {
        state.postLoading = false;
        state.posts = action.payload;
      })

      // COMMENTS
      .addCase(addCommentData.pending, (state) => {
        state.commentLoading = true;
      })
      .addCase(addCommentData.fulfilled, (state, action) => {
        state.commentLoading = false;
        state.commentSuccess = true;
        state.posts = state.posts.map((p) =>
          p._id === action.payload._id ? action.payload : p
        );
      })
      .addCase(addCommentData.rejected, (state, action) => {
        state.commentLoading = false;
        state.commentError = true;
        state.commentMessage = action.payload;
      })

      // LIKES
      .addCase(addLikeData.pending, (state) => {
        state.likesLoading = true;
      })
      .addCase(addLikeData.fulfilled, (state, action) => {
        state.likesLoading = false;
        state.likesSuccess = true;
        state.posts = state.posts.map((p) =>
          p._id === action.payload._id ? action.payload : p
        );
      })
      .addCase(addLikeData.rejected, (state, action) => {
        state.likesLoading = false;
        state.likesError = true;
        state.likesMessage = action.payload;
      })

      // MY POSTS
      .addCase(getRelaventPosts.fulfilled, (state, action) => {
        state.postLoading = false;
        state.myPost = action.payload;
      });
  },
});

export default postSlice.reducer;
