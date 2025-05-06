import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const getUserDetails = createAsyncThunk(
  'user/getuserdetail',
  async (parsedDetail, {dispatch}) => {
    try {
      const userId = parsedDetail?.id;
      if (!userId) {
        throw new Error('User ID is missing');
      }
      // Listen to Firestore document changes
      const unsubscribe = firestore()
        .collection('users')
        .doc(userId)
        .onSnapshot(snapshot => {
          if (snapshot.exists) {
            const userData = snapshot.data();
            // Fix createdAt field if needed
            if (userData.createdAt?.toDate) {
              userData.createdAt = userData.createdAt.toDate().toISOString();
            }
            const fullUserData = {
              ...userData,
              id: snapshot.id,
            };
            // Dispatch updated user data into Redux
            dispatch(setUser(fullUserData));
          }
        });
      // Return the unsubscribe function in case you want to stop listening later
      return unsubscribe;
    } catch (error) {
      throw error; // Let Redux handle the error
    }
  },
);
// Firestore Register Function
export const RegisterUser = userData => async dispatch => {
  try {
    const querySnapshot = await firestore()
      .collection('users')
      .where('email', '==', userData.email)
      .get();

    if (!querySnapshot.empty) {
      dispatch(setLoginError('Email already registered.'));
      return {success: false, error: 'Email already registered.'};
    }
    await firestore()
      .collection('users')
      .add({
        ...userData,
        createdAt: firestore.FieldValue.serverTimestamp(), // 👈 use Firestore server timestamp
      });
    return {success: true};
  } catch (error) {
    dispatch(setLoginError(error.message));
    return {success: false, error: error.message};
  }
};

export const LoginUser = loginData => async dispatch => {
  try {
    const querySnapshot = await firestore()
      .collection('users')
      .where('email', '==', loginData.email)
      .get();

    if (querySnapshot.empty) {
      dispatch(setLoginError('Incorrect email or password'));
      return {success: false, error: 'Incorrect email or password'};
    }

    const userDoc = querySnapshot.docs[0];
    const userData = userDoc.data();
    const userId = userDoc.id; // Get the document ID

    if (userData.password !== loginData.password) {
      dispatch(setLoginError('Incorrect email or password'));
      return {success: false, error: 'Incorrect email or password'};
    }

    // Fix createdAt
    if (userData.createdAt?.toDate) {
      userData.createdAt = userData.createdAt.toDate().toISOString();
    }

    // Attach id with userData
    const fullUserData = {
      ...userData,
      id: userId,
    };

    // Save full user data to Redux
    dispatch(setUser(fullUserData));

    // Save only username and id to AsyncStorage
    const minimalUserData = {
      username: userData.username,
      id: userId,
    };

    await AsyncStorage.setItem(
      'credentialDetail',
      JSON.stringify(minimalUserData),
    );

    return {success: true, user: fullUserData};
  } catch (error) {
    dispatch(setLoginError(error.message));
    return {success: false, error: error.message};
  }
};

export const UpdateUser = updatedData => async dispatch => {
  try {
    const querySnapshot = await firestore()
      .collection('users')
      .where('email', '==', updatedData.email)
      .get();
    if (querySnapshot.empty) {
      dispatch(setUpdateError('User not found'));
      return {success: false, error: 'User not found'};
    }
    const userDoc = querySnapshot.docs[0];
    const userRef = firestore().collection('users').doc(userDoc.id);
    // Update the user document
    await userRef.update(updatedData);
    // Get the updated user data
    await userRef.get();
    // const updatedUserSnapshot = await userRef.get();
    // const updatedUserData = updatedUserSnapshot.data();
    // // Fix createdAt field if needed
    // if (updatedUserData.createdAt?.toDate) {
    //   updatedUserData.createdAt = updatedUserData.createdAt
    //     .toDate()
    //     .toISOString();
    // }
    // Save updated user to Redux
    // dispatch(setUser(updatedUserData));
    return {success: true};
  } catch (error) {
    dispatch(setUpdateError(error.message));
    return {success: false, error: error.message};
  }
};

// Function to fetch all user data excluding the logged-in user
export const getAllUsersExcludingCurrent = () => async (dispatch, getState) => {
  try {
    const {email: currentUserEmail} = getState().user?.user;

    if (!currentUserEmail) {
      console.error('No logged-in user found!');
      return;
    }

    const usersRef = firestore().collection('users');

    const unsubscribe = usersRef
      .where('email', '!=', currentUserEmail)
      .onSnapshot(
        snapshot => {
          const users = [];
          snapshot.forEach(doc => {
            const data = doc.data();
            users.push({
              id: doc.id,
              ...data,
              createdAt:
                data.createdAt?.toDate?.() instanceof Date
                  ? data.createdAt.toDate().toISOString()
                  : null,
              updatedAt:
                data.updatedAt?.toDate?.() instanceof Date
                  ? data.updatedAt.toDate().toISOString()
                  : null,
            });
          });

          dispatch(setAllUser(users));
        },
        error => {
          console.log('Error fetching users:', error.message);
        },
      );

    return unsubscribe;
  } catch (error) {
    console.log('Error:', error.message);
  }
};

export const getChatLabelForUser = createAsyncThunk(
  'user/getChatLabels',
  async (_, {getState, dispatch}) => {
    const {id: userId} = getState().user?.user;
    const unsubscribe = firestore()
      .collection('chatLabels')
      .doc(userId)
      .onSnapshot(
        doc => {
          if (!doc.exists) {
            dispatch(setChatLabels([])); // Dispatch empty array if document doesn't exist
            return;
          }
          const data = doc.data();
          const labels = Object.keys(data)
            .filter(key => key.startsWith('chat'))
            .map(key => ({
              key,
              label: data[key].label || 'Untitled Chat',
              uniqId: data[key].uniqId || '',
            }));
          dispatch(setChatLabels(labels)); // Dispatch labels to Redux store
        },
        error => {
          console.error('Error fetching chat labels:', error);
        },
      );

    // Return unsubscribe function for cleanup
    return unsubscribe;
  },
);

export const getAllChatsForUser = createAsyncThunk(
  'chat/getAllChats',
  async (uniqId = null, {dispatch, getState}) => {
    try {
      const {id: userId} = getState().user?.user;
      const doc = await firestore().collection('chats').doc(userId).get();

      if (!doc.exists) {
        throw new Error('No chat document found for this user');
      }

      const data = doc.data();
      const allChats = [];

      // Only get specific chat if uniqId is passed
      if (uniqId) {
        const key = `chat${uniqId}`;
        if (data[key]) {
          const chat = {
            key,
            label: data[key].label || 'Untitled',
            messages: data[key].messages || [],
          };
          dispatch(setSingleChat([chat]));
          return [chat];
        } else {
          throw new Error('Requested chat not found');
        }
      }
      // If no uniqId, return all chats
      Object.keys(data)?.forEach(key => {
        if (key.startsWith('chat')) {
          allChats?.push({
            key,
            label: data[key].label || 'Untitled',
            messages: data[key].messages || [],
          });
        }
      });

      dispatch(setSingleChat(allChats));
      return allChats;
    } catch (error) {
      console.error('Error fetching chats: ', error);
      throw error;
    }
  },
);

const initialState = {
  user: null,
  alluser: [],
  status: 'idle', // 'idle', 'loading', 'succeeded', 'failed'
  error: null,
  role: '',
  isLogining: false,
  gettinguserError: '',
  isloginError: '',
  isprofileError: '',
  isUpdateError: '',
  chatLabels: [],
  allUserChat: [],
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    clearLoginError: state => {
      state.isloginError = ''; // Reset error when user types
    },
    clearProfileError: state => {
      state.isprofileError = ''; // Reset error when user types
    },
    setLoginError: (state, action) => {
      state.isloginError = action.payload; // Reset error when user types
    },
    setUpdateError: (state, action) => {
      state.isUpdateError = action.payload; // Reset error when user types
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setAllUser: (state, action) => {
      state.alluser = action.payload;
    },
    setChatLabels: (state, action) => {
      state.chatLabels = action.payload;
    },
    setSingleChat: (state, action) => {
      state.allUserChat = action.payload;
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
export const {
  logoutUser,
  clearLoginError,
  clearProfileError,
  setLoginError,
  setUser,
  setAllUser,
  setChatLabels,
  setSingleChat,
} = userSlice.actions;
export default userSlice.reducer;
