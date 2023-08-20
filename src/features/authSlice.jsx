import { createSlice } from "@reduxjs/toolkit";

const initialState={
    currentUser:"",
    loading:false,
    error:false,
    isAdmin:false,
    token:"",

}

const authSlice=createSlice({

    name:'auth',

    initialState,

    reducers:{

        fetchStart:(state)=>{
            state.loading=true;
            state.error = false;
        },
        fetchFail:(state)=>{
            state.loading=false;
            state.error=true;

        },
        loginSuccess:(state,payload)=>{
            state.loading=false;
            state.currentUser=""
            state.isAdmin=false,
            state.token=""

        },
        logoutSuccess:(state,payload)=>{
            state.loading=false;
            state.currentUser = "";
            state.token="";

        },
        registerSuccess:(state)=>{
            state.loading=true;
            state.currentUser="";
            state.token="";
            
        }
    }


})

export const
{
    fetchStart,
    fetchFail,
    loginSuccess,
    logoutSuccess

}=authSlice.actions

export default authSlice.reducer;





