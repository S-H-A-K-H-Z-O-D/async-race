import {configureStore} from "@reduxjs/toolkit";
import {carApi} from "./api.ts";

const store = configureStore({
    reducer: {
        [carApi.reducerPath]: carApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(carApi.middleware),
});

export default store