import { createSlice } from "@reduxjs/toolkit";

const initialState={
    loading:false,
    error:false,
    allPost:[],
    categories:[]
}


const blogSlice=createSlice({

    name:'blog',

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
        fetchSuccessPost:(state,action)=>{
            state.loading=false;
            state.allPost=action.payload
            state.categories=action.payload

        }
    }

})

export const {fetchStart,fetchFail,fetchSuccessPost} = blogSlice.actions

export default blogSlice.reducer;




