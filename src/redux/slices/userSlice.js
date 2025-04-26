import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
import firestore from '@react-native-firebase/firestore';



export const getUserDetails = createAsyncThunk(
  'user/getuserdetail',
  async parsedDetail => {
    try {
      const response = await axios.post(
        `${CLOUD_URL}/getuserDetail`,
        parsedDetail,
        {
          headers: {
            Authorization: `Bearer ${parsedDetail?.token}`, // Ensure token exists
          },
        },
      );
      return response.data; // Return only the data part
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error; //  Ensure Redux handles the error properly
    }
  },
);

// Firestore Register Function
export const RegisterUser = (userData) => async (dispatch) => {
  try {
    await firestore()
      .collection('users') // your collection name
      .add({
        ...userData,
        createdAt: firestore.FieldValue.serverTimestamp(),
      });

    console.log('User registered successfully!');
    
    // Optional: Dispatch success action if you have Redux actions
    // dispatch({ type: 'REGISTER_SUCCESS' });

  } catch (error) {
    console.error('Error registering user:', error);
    
    // Optional: Dispatch error action
    // dispatch({ type: 'REGISTER_FAIL', payload: error.message });
  }
};

const initialState = {
  user: null,
  status: 'idle', // 'idle', 'loading', 'succeeded', 'failed'
  error: null,
  role: '',
  isLogining: false,
  gettinguserError: '',
  isloginError: '',
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logoutUser: state => {
      state.user = null;
    },
    clearLoginError: state => {
      state.isloginError = ''; // Reset error when user types
    },
  },
  extraReducers: builder => {
    builder
      // Get UserDetail (admin or user)
      .addCase(getUserDetails.pending, state => {
        state.isGettingUser = true;
        state.gettinguserError = ''; // Clear previous error
      })
      .addCase(getUserDetails.fulfilled, (state, action) => {
        state.isGettingUser = false;
        state.user = action.payload.success ? action.payload.data : null;
        state.gettinguserError = action.payload.success
          ? ''
          : action.payload.message;
      })
      .addCase(getUserDetails.rejected, (state, action) => {
        state.isGettingUser = false; // Fix assignment
        state.gettinguserError =
          action.error.message || 'Failed to fetch user details';
      });
  },
});

// Export actions and reducer
export const {logoutUser, clearLoginError} = userSlice.actions;
export default userSlice.reducer;
