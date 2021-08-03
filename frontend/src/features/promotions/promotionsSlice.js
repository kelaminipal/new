import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";

export const getPromotions = createAsyncThunk(
    "promotions/getPromotions",
    async (payload,state)=>{
        const resp = await fetch(`api/promotions/promotionsGet`)

        if (resp.ok) {
            return await resp.json()
        }
    }
)

export const PromotionsSlice = createSlice({
    name: "promotions",
    initialState: {

        arePromotions: false,
        promotions: [],
    },
    reducers:{

    },
    extraReducers: (builder) => {
        builder.addCase(getPromotions.fulfilled, (state, action) => {
            const {promotionsResult} = action.payload
            promotionsResult.forEach(i=> state.promotions.push(i))

            state.arePromotions = true



        })
    },

})

export default PromotionsSlice.reducer