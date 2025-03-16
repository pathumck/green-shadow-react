import { createSlice} from '@reduxjs/toolkit';



const initialState : string = ""

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    
    login: (state, action) => {
      return action.payload;
    },
    logout: (state, action) => {
      return "";
    },  
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
