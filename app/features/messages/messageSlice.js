import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  messageLoading: false,
  messageSuccess: false,
  messageError: false,
  errorMessage: "",
  messages: [],
};
const BASE_URL = 'http://192.168.x.x:5000/api';


export const sendMessageData = createAsyncThunk(
  'message/send',
  async (messageData, thunkAPI) => {
    try {
      const res = await axios.post(
        `${BASE_URL}/messages/send-message/${messageData.sender_id}/${messageData.receiver_id}`,
        messageData
      );
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || 'Something went wrong');
    }
  }
);


export const getMessageData = createAsyncThunk(
  'message/get',
  async (messageData, thunkAPI) => {
    try {
      const res = await axios.get(
        `${BASE_URL}/messages/get-message/${messageData.sender_id}/${messageData.receiver_id}`
      );
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || 'Something went wrong');
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
