import { createSlice } from "@reduxjs/toolkit";

const INITIAL_STATE = {
  medicineInfo: {}, 
  faqInfo: {},
};

const medicineSlice = createSlice({
  name: "user",
  initialState: INITIAL_STATE,
  reducers: {
    setMedicineInfo: (state, action) => {
      state.medicineInfo = { ...state.medicineInfo, ...action.payload }; 
    },
    setfaqInfo: (state, action) => {
      state.faqInfo = { ...state.faqInfo, ...action.payload }; 
    },
    resetMedicineDetails: () => INITIAL_STATE,
  },
});

export const { setMedicineInfo, setfaqInfo, resetMedicineDetails } = medicineSlice.actions;

export default medicineSlice.reducer;
