// import { persistStore, persistReducer } from "redux-persist";
// import { configureStore, combineReducers } from "@reduxjs/toolkit";
// import storage from "redux-persist/lib/storage";
// import userReducer from "./Slices/UserSlice";

// const persistConfig = {
//   key: "root",
//   storage,
// };

// const rootReducer = combineReducers({
//   user: persistReducer(persistConfig, userReducer),
// });
// const Store = configureStore({
//   reducer: rootReducer,
// });

// const persistor = persistStore(Store);

// export { Store,persistor};

import { configureStore, combineReducers } from "@reduxjs/toolkit";
import medicineReducer from "./Slices/MedicineSlice";

const rootReducer = combineReducers({
  medicine: medicineReducer,
});

const Store = configureStore({
  reducer: rootReducer,
});

export { Store };
