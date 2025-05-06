import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NetInfo from '@react-native-community/netinfo';
import {getUserDetails, setUser} from './userSlice';
import firestore from '@react-native-firebase/firestore';
import axios from 'axios';


export const getStoredcredential = createAsyncThunk(
  'auth/getStoredcredential',
  async (_, {dispatch}) => {
    const storedDetail = await AsyncStorage.getItem('credentialDetail');
    let parsedDetail = storedDetail ? JSON.parse(storedDetail) : null;
    if (parsedDetail) {
      // Set token in Redux first
      dispatch(setToken(parsedDetail));
      dispatch(getUserDetails(parsedDetail)); // Now fetch user details after setting the token
      await dispatch(setUserLoading(false));
    }
    return parsedDetail;
  },
);


export const updateCollaborate = (targetUserId, status = 'pending') => async (dispatch, getState) => {
  try {
    const loginedUserId = getState()?.user?.user?.id;
    if (!loginedUserId || !targetUserId) {
      dispatch(setUpdateError('Invalid user IDs'));
      return { success: false, error: 'Invalid user IDs' };
    }

    const userRef = firestore().collection('users').doc(targetUserId);
    const userDoc = await userRef.get();

    if (!userDoc.exists) {
      dispatch(setUpdateError('User not found'));
      return { success: false, error: 'User not found' };
    }
    const existingList = userDoc.data()?.collaborateList || [];

    const userIndex = existingList.findIndex(item => item.userId === loginedUserId);
    let updatedList = [...existingList];

    if (userIndex > -1) {
      // If user already exists, update their status
      updatedList[userIndex].status = status;
    } else {
      // If not exists, add as new collaborator
      updatedList.push({ userId: loginedUserId, status });
    }
    await userRef.update({ collaborateList: updatedList });
    return { success: true,userId:updatedList[0]?.userId };
  } catch (error) {
    dispatch(setUpdateError(error.message));
    return { success: false, error: error.message };
  }
};



// const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent';
const GEMINI_API_KEY = 'AIzaSyAB-Sa7bHyI6zBDwPzVskyD0voBpm85G8Q'; // Replace this with your key
const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`;

export const getCodeExplanation = async (codeText) => {
  try {
    const response = await axios.post(
      `${GEMINI_API_URL}`,
      {
        contents: [
          {
            parts: [
              {
                text: `Explain this code:\n\n${codeText}`
              }
            ]
          }
        ]
      },
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );

    const explanation = response.data.candidates?.[0]?.content?.parts?.[0]?.text;
    return explanation || "No explanation found.";
  } catch (error) {
    console.error("Gemini API error:", error.message);
    return "Failed to get explanation.";
  }
};


const initialState = {
  token: null,
  tokenStatus: 'idle', // Can be 'idle', 'loading', 'succeeded', 'failed'
  error: null,
  refreshKey: 0, // Store refresh key in Redux
  isConnected: true,
  loading: true,
  isUpdateError:''
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
    setUpdateError: (state, action) => {
      state.isUpdateError = action.payload; // Reset error when user types
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
export const {setToken, logout, setConnectionStatus, setUserLoading,setUpdateError} =
  normalSlice.actions;
// Export the reducer
export default normalSlice.reducer;
