import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import configSlice from "features/sim/configSlice";
import teamSlice from "features/team/teamSlice";
import importSlice from "features/import/importSlice";
import resultSlice from "features/result/resultSlice";

export const store = configureStore({
  reducer: {
    settings: configSlice,
    team: teamSlice,
    import: importSlice,
    result: resultSlice,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
