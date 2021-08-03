import {createSlice} from "@reduxjs/toolkit";
import Cookies from "js-cookie"
const token =  Cookies.get('token')


export const authSlice = createSlice({
    name: "auth",
    initialState: {
        isInSystem: !!token,
        token: !!token,
        isTokenTrusted: false,
        email: '',
        name: '',


    },
    reducers:{
        letInSystem: (state,action)=>{
            state.isInSystem = true
        },
        insertDataAuth: (state,action)=>{

            state.email = action.payload.email
            state.name = action.payload.name
            state.isTokenTrusted = true

        }




    }

})
export const {letInSystem,insertDataAuth} = authSlice.actions
export default authSlice.reducer