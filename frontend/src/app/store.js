import {configureStore} from "@reduxjs/toolkit";
import alertReducer from "../features/alert/alertSlice"
import authReducer from "../features/auth/authSlice"
import regionsReducer  from "../features/regions/regionsSlice"
import promotionsReducer  from "../features/promotions/promotionsSlice"
import categoriesReducer  from "../features/categories/categoriesSlice"
export default configureStore({
    reducer: {
        alert: alertReducer,
        auth: authReducer,
        regions: regionsReducer,
        promotions: promotionsReducer,
        categories: categoriesReducer





    }
})