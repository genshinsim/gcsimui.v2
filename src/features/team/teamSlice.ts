import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { blankChar, Character } from "../../util";

export type Team = Array<Character>;

const initialState: Team = [];

export const teamSlice = createSlice({
  name: "team",
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    setCharacter: (
      state,
      action: PayloadAction<{ index: number; data: Character }>
    ) => {
      if (action.payload.index > 0 && action.payload.index < state.length) {
        state[action.payload.index] = action.payload.data;
      }
    },
    addCharacter: (state) => {
      //add new if length < 4
      if (state.length < 4) {
        state.push(blankChar());
      }
    },
    setTeam: (
      state,
      action: PayloadAction<{ data: Character[] }>
    ) => {
      if (action.payload.data.length > 0 && action.payload.data.length <= 4 ) {
          state = action.payload.data
      }
    },
  },
});

export const { setCharacter, addCharacter, setTeam } = teamSlice.actions;

export default teamSlice.reducer;
