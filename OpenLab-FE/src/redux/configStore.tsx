import { configureStore } from "@reduxjs/toolkit";
import UserReducer from "./UserReducer/UserReducer";
import ProductReducer from "./ProductReducer/ProductReducer";
import MyLearningReducer from "./MyLearningReducer/MyLearningReducer";

export const store = configureStore({
    reducer: {
        UserReducer,
        ProductReducer,
        MyLearningReducer
    }
})

export type RootState = ReturnType<typeof store.getState>

export type DispatchType = typeof store.dispatch