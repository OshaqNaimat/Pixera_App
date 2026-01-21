import {createSlice,createAsyncThunk} from '@reduxjs/toolkit'
import axios from 'axios'

let checkUser = JSON.parse(localStorage.getItem('user'))

const initialState = {
    user :checkUser? checkUser : null,
    userLoading:false,
    userSuccess:false,
    userError:false,
    userMessage:'',
    foundUser:null,
    allUsers:[],
    Authenticated:false

}

export const regUser = createAsyncThunk('user',async(userData,thunkAPI)=>{
    try {
        const response = await axios.post("http://localhost:5000/api/users/register",userData)
        localStorage.setItem('user',JSON.stringify(response.data))
        return response.data
    } catch (error) {   
        return thunkAPI.rejectWithValue(error.response.data)
    }
})



export const findMyUser = createAsyncThunk('find-user',async(user_id,thunkAPI)=>{
    try {
        const response = await axios.get(`http://localhost:5000/api/users/find-user/${user_id}`)
        return response.data
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data)
    }
})

export const getAllUsers = createAsyncThunk('get-all-users',async(_,thunkAPI)=>{
    try {
        const response = await axios.get('http://localhost:5000/api/users/get-all-users')
        return response.data
    } catch (error) {
        
        return thunkAPI.rejectWithValue(error.response.data)
    }
})

export const LoginUser = createAsyncThunk("Login-user", async(LoginData,thunkAPI)=>{
    try {
        const response = await axios.post("http://localhost:5000/api/users/login",LoginData)
        return response.data
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data)
    }
})

export const userSlice = createSlice({
    name:'auth',
    initialState,
    reducers:{
        userReset:(state)=>{
            state.userError = false,
            state.userMessage = '',
            state.userSuccess = false,
            state.userLoading = false
        },
         Signout: (state) => {
    localStorage.removeItem("user");
    state.user = null;
    state.userError = false;
    state.userMessage = '';
    state.userSuccess = false;
    state.userLoading = false;
    state.allUsers = []
  }
    },
    extraReducers: (builder)=>{
        builder
        .addCase(regUser.pending , (state,action)=>{
            state.Authenticated = false
            state.userLoading = true
        })
        .addCase(regUser.rejected ,(state,action)=>{
            state.userLoading = false,
            state.userError = true,
            state.Authenticated = false,
            state.userMessage = action.payload,
            state.user = null
        })
        .addCase(regUser.fulfilled ,(state,action)=>{
            state.Authenticated = true
            state.userLoading = false
            state.userSuccess = true
            state.user =  action.payload

        })
        builder
        .addCase(findMyUser.pending , (state,action)=>{
            state.userLoading = true
        })
        .addCase(findMyUser.rejected ,(state,action)=>{
            state.userLoading = false,
            state.userError = true,
            state.userMessage = action.payload,
            state.foundUser = null
        })
        .addCase(findMyUser.fulfilled ,(state,action)=>{
            state.userLoading = false
            state.userSuccess = true
            state.foundUser =  action.payload

        })
        builder
        .addCase(getAllUsers.pending , (state,action)=>{
            state.userLoading = true
        })
        .addCase(getAllUsers.rejected ,(state,action)=>{
            state.userLoading = false,
            state.userError = true,
            state.userMessage = action.payload,
            state.allUsers = null
        })
        .addCase(getAllUsers.fulfilled ,(state,action)=>{
            state.userLoading = false
            state.userSuccess = true
            state.allUsers =  action.payload

        })
        .addCase(LoginUser.pending , (state,action)=>{
            state.userLoading = true
        })
        .addCase(LoginUser.rejected ,(state,action)=>{
            state.userLoading = false,
            state.userError = true,
            state.userMessage = action.payload
            
        })
        .addCase(LoginUser.fulfilled ,(state,action)=>{
            state.userLoading = false
            state.userSuccess = true
            state.allUsers =  action.payload

        })
    }
})

export default userSlice.reducer
export const {Signout,userReset} = userSlice.actions
