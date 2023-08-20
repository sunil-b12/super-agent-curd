import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import { superAgentApi } from "./superAgentApi";




export const store = configureStore({
    reducer: {
        [superAgentApi.reducerPath]: superAgentApi.reducer
    },

    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat([
            superAgentApi.middleware
        ])

})

setupListeners(store.dispatch)