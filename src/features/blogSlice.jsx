import { createSlice } from "@reduxjs/toolkit";

const initialState={
    loading:false,
    error:false,
    allPost:[],
    categories:[],
    comments:[],
    likes:0,
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
            state.allPost=action?.payload
            

        },
        fetchSuccessCategory:(state,action)=>{
            state.loading=false;
            state.categories=action?.payload
        },
        fetchSuccessComments:(state,action)=>{
            state.loading=false;
            state.comments=action?.payload
        }
    }

})

export const {
    fetchStart,
    fetchFail,
    fetchSuccessPost,
    fetchSuccessCategory,
    fetchSuccessComments} = blogSlice.actions

export default blogSlice.reducer;




