import {createContext, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {getAllUsersExcludingCurrent} from '../redux/slices/userSlice';
export const funcContext = createContext();
export const ContextProvider = ({children}) => {
  const dispatch = useDispatch();
  const {user} = useSelector(state => state?.user);
  useEffect(() => {
    if (user) {
      dispatch(getAllUsersExcludingCurrent());
    }
  }, [user, dispatch]);

  return <funcContext.Provider value={{}}>{children}</funcContext.Provider>;
};
