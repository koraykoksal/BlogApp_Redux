import { createSlice } from "@reduxjs/toolkit";

const initialState={
    currentUser:"",
    loading:false,
    error:false,
    //isAdmin:false,
    token:"",
    userInfo:[]

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
        loginSuccess:(state,action)=>{
            state.loading=false;
            state.currentUser=action?.payload?.user?.username
            state.token=action?.payload?.key
            state.userInfo=action?.payload?.user
            
        },
        logoutSuccess:(state)=>{
            state.loading=false;
            state.currentUser = "";
            state.token="";

        },
        //*payload içindeki dataya action olmadan erişmek için payload bilgisini object içinde belirtmek gerekir
        registerSuccess:(state,{payload})=>{
            state.loading=true;
            state.currentUser=payload?.username;
            state.token=payload?.token;
            
        }
    }


})

export const
{
    fetchStart,
    fetchFail,
    loginSuccess,
    logoutSuccess,
    registerSuccess

}=authSlice.actions

export default authSlice.reducer;





