import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";

export const getCategories = createAsyncThunk(
    "categories/getCategories",
    async (payload,state)=>{


            const resp = await fetch(`api/categories/categoriesGet`,{
                headers: {
                    'Content-Type': 'application/json'

                },
                method: 'POST',
                body: JSON.stringify({"region": state.getState().regions.currentRegion._id})
            })

            if (resp.ok) {

                return await resp.json()
            }


    }
)

export const CategoriesSlice = createSlice({
    name: "categories",
    initialState: {

        areCategories: false,
        categories: [],
    },
    reducers:{

    },
    extraReducers: (builder) => {
        builder.addCase(getCategories.fulfilled, (state, action) => {
            const {result} = action.payload

            result.forEach(x=>state.categories.push(x))
            state.areCategories = true



        })
    },

})

export default CategoriesSlice.reducer