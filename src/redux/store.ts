import { configureStore } from "@reduxjs/toolkit";
import { userApi } from "./api/userApi";
import { personApi } from "./api/personApi";
import personReducer from "./slices/personSlice";

const store = configureStore({
  reducer: {
    [userApi.reducerPath]: userApi.reducer,
    [personApi.reducerPath]: personApi.reducer,
    person: personReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(userApi.middleware, personApi.middleware),
  devTools: true,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
