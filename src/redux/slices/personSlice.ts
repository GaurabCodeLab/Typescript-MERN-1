import { createSlice } from "@reduxjs/toolkit";
import type { Person } from "../../types/person";

const initialState: { personDetails: Person | null } = { personDetails: null };

const personSlice = createSlice({
  name: "person",
  initialState,
  reducers: {
    loggedInPerson: (state, action) => {
      state.personDetails = action.payload;
    },
    removePerson: (state) => {
      state.personDetails = null;
    },
  },
});

export default personSlice.reducer;
export const { loggedInPerson, removePerson } = personSlice.actions;
