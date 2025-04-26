import {configureStore} from '@reduxjs/toolkit';
import themeSlice from '../slices/themeSlice';
import normalSlice from '../slices/normalSlice';
import userSlice from '../slices/userSlice';
const store = configureStore({
  reducer: {
    //Define slice here
    theme: themeSlice,
    normal: normalSlice, // Manage auth-related state
    user: userSlice,
  },
});

export default store;
