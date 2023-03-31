import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  place: undefined,
  date: [],
  person: {
    child: undefined,
    adult: undefined,
    room: undefined,
  },
};

export const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setsearch: (state, action) => {
      const { date, place, person } = action.payload;
      state.date = date;
      state.place = place;
      state.person=person
    },
    resetsearch: () => {
      return initialState;
    },
  },
});

export const { setsearch, resetsearch } = searchSlice.actions;

export default searchSlice.reducer;
