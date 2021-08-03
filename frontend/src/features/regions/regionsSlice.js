import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";

export const getRegions = createAsyncThunk(
    "regions/getRegions",
    async (payload)=>{
        const resp = await fetch(`api/regions/regionsGet`);
        if (resp.ok) {
            return await resp.json()
        }
    }
)

export const regionsSlice = createSlice({
    name: "regions",
    initialState: {
        currentRegion: null,
        areRegions: false,
        regions: [],
    },
    reducers:{

    },
    extraReducers: (builder) => {
        builder.addCase(getRegions.fulfilled, (state, action) => {
            const {regionsResult} = action.payload

            regionsResult.sort((a, b)=> a.order - b.order);
            regionsResult.forEach((i,b)=>{

                b === 0 ?  state.currentRegion = i :  state.regions.push(i)
            })

            state.areRegions = true



        })
    },

})

export default regionsSlice.reducer