import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NetInfo from '@react-native-community/netinfo';
import {getUserDetails, setUser} from './userSlice';

export const getStoredcredential = createAsyncThunk(
  'auth/getStoredcredential',
  async (_, {dispatch}) => {
    const storedDetail = await AsyncStorage.getItem('credentialDetail');
    let parsedDetail = storedDetail ? JSON.parse(storedDetail) : null;
    if (parsedDetail) {
      // Set token in Redux first
      dispatch(setToken(parsedDetail));
      console.log(parsedDetail, 'parsedDetail');
      dispatch(getUserDetails(parsedDetail)); // Now fetch user details after setting the token
      await dispatch(setUserLoading(false));
    }
    return parsedDetail;
  },
);

const initialState = {
  token: null,
  tokenStatus: 'idle', // Can be 'idle', 'loading', 'succeeded', 'failed'
  error: null,
  refreshKey: 0, // Store refresh key in Redux
  isConnected: true,
  loading: true,
};

const normalSlice = createSlice({
  name: 'normal',
  initialState,
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
    },
    logout: state => {
      state.token = null;
      AsyncStorage.clear();
    },
    setConnectionStatus: (state, action) => {
      state.isConnected = action.payload;
    },
    setUserLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(getStoredcredential.pending, state => {
        state.tokenStatus = 'loading';
      })
      .addCase(getStoredcredential.fulfilled, (state, action) => {
        state.tokenStatus = 'succeeded';
        state.token = action.payload;
      })
      .addCase(getStoredcredential.rejected, (state, action) => {
        state.tokenStatus = 'failed';
        state.error = action.error.message;
      });
  },
});

export const subscribeToNetwork = dispatch => {
  const unsubscribe = NetInfo.addEventListener(state => {
    dispatch(setConnectionStatus(state.isConnected));
  });
  return unsubscribe; // Return function to stop listening when unmounted
};

// Export actions from slice
export const {setToken, logout, setConnectionStatus, setUserLoading} =
  normalSlice.actions;
// Export the reducer
export default normalSlice.reducer;
