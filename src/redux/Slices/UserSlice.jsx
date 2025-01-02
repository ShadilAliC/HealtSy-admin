import { createSlice } from "@reduxjs/toolkit";

const INITIAL_STATE = {
  userInfo: {}, 
  pharmacyInfo: {},
};

const userSlice = createSlice({
  name: "user",
  initialState: INITIAL_STATE,
  reducers: {
    setUserInfo: (state, action) => {
      state.userInfo = { ...state.userInfo, ...action.payload }; 
    },
    setPharmacyInfo: (state, action) => {
      state.pharmacyInfo = { ...state.pharmacyInfo, ...action.payload }; 
    },
    resetUserDetails: () => INITIAL_STATE,
  },
});

export const { setUserInfo, setPharmacyInfo, resetUserDetails } = userSlice.actions;

export default userSlice.reducer;
