import { configureStore } from "@reduxjs/toolkit";
import MemberSlice from "./slicers/MemberSlice";


export const store = configureStore({
  reducer: {
    MemberReducer: MemberSlice,

  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
