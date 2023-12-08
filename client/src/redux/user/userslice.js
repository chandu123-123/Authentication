import { createSlice } from "@reduxjs/toolkit";
const initialState={
    loading:false,
    error:false,
    currentuser:null
}
const userslice=createSlice({
    name :"user",
    initialState,
    reducers:{
        signinstart:(state)=>{
            state.loading=true
        },
      signinsuccess:(state,action)=>{
        state.loading=false,
        state.currentuser=action.payload,
        state.error=false

      }, 
      signinfailure:(state,action)=>{
        state.loading=false,
        state.error=action.payload
      }
    }
})
export const {signinfailure,signinstart,signinsuccess}=userslice.actions
export default userslice.reducer