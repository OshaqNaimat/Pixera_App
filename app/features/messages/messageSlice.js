import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../../services/api";

const initialState = {
  messageLoading: false,
  messageSuccess: false,
  messageError: false,
  errorMessage: "",
  messages: [],
};

export const sendMessageData = createAsyncThunk(
  "message/send",
  async (messageData, thunkAPI) => {
    try {
      const res = await api.post(
        `/messages/send-message/${messageData.sender_id}/${messageData.receiver_id}`,
        messageData
      );
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data);
    }
  }
);

export const getMessageData = createAsyncThunk(
  "message/get",
  async (messageData, thunkAPI) => {
    try {
      const res = await api.get(
        `/messages/get-message/${messageData.sender_id}/${messageData.receiver_id}`
      );
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data);
    }
  }
);

const messageSlice = createSlice({
  name: "message",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(sendMessageData.pending, (state) => {
        state.messageLoading = true;
      })
      .addCase(sendMessageData.rejected, (state, action) => {
        state.messageLoading = false;
        state.messageError = true;
        state.errorMessage = action.payload;
      })
      .addCase(sendMessageData.fulfilled, (state, action) => {
        state.messageLoading = false;
        state.messageSuccess = true;
        state.messages = action.payload.chats;
      })
      .addCase(getMessageData.pending, (state) => {
        state.messageLoading = true;
      })
      .addCase(getMessageData.rejected, (state, action) => {
        state.messageLoading = false;
        state.messageError = true;
        state.errorMessage = action.payload;
      })
      .addCase(getMessageData.fulfilled, (state, action) => {
        state.messageLoading = false;
        state.messageSuccess = true;
        state.messages = action.payload.chats;
      });
  },
});

export default messageSlice.reducer;
