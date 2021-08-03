import {createSlice} from "@reduxjs/toolkit";
export const alertSlice = createSlice({
    name: "alert",
    initialState: {
        message: "",
        isCreated: false
    },
    reducers:{
        alert: (state,action) => {
                if(state.isCreated === false){
                    let parentElement = document.createElement("div")
                    let divElement = document.createElement("div")
                    parentElement.id = "alertMessageBlockParent"
                    divElement.id = "alertMessageBlockParent__element"
                    divElement.innerText = `${action.payload.message}`
                    document.body.appendChild((parentElement))
                    parentElement.appendChild(divElement)
                    state.isCreated = true
                    setTimeout(()=>{

                        divElement.parentNode.removeChild(divElement);

                    },4300)
                }
                else{
                    let divElement = document.createElement("div")
                    divElement.id = "alertMessageBlockParent__element"
                    divElement.innerText = `${action.payload.message}`
                    document.getElementById("alertMessageBlockParent").appendChild(divElement)
                    setTimeout(()=>{

                        divElement.parentNode.removeChild(divElement);

                    },4300)

                }







        }

    }
})
export const {alert} = alertSlice.actions
export default alertSlice.reducer