import React, {
  createContext,
  useReducer,
  useEffect,
  useCallback
} from 'react';
import userReducer from './userReducer';
import * as types from './userActionTypes';
import ClientAPI from '../../helpers/apiUtils';

const initialUserState = {
  loading: false,
  error: false,
  users: '',
  user: null,
  me: null,
  errResponse: '',
  message: null
};

export const UserContext = createContext(initialUserState);

export const UserProvider = ({ children }) => {
  const [state, dispatch] = useReducer(userReducer, initialUserState);

  const UserReset = () => {
    dispatch({
      type: types.USER_RESET
    });
  };

  const fetchUsers = useCallback(async () => {
    dispatch({
      type: types.USER_START
    });
    try {
      const res = await ClientAPI.get('/api/user/');
      dispatch({
        type: types.USER_SUCCESS,
        payload: res.data.data
      });
    } catch (error) {
      dispatch({
        type: types.USER_FAILURE,
        payload: error.response.data.error_msg
      });
    }
  }, []);

  const fetchLoggedInUser = useCallback(async () => {
    dispatch({
      type: types.USER_START
    });
    try {
      const res = await ClientAPI.get('/api/user/me');
      dispatch({
        type: types.GET_LOGGED_IN_USER,
        payload: res.data.data
      });
    } catch (error) {
      dispatch({
        type: types.USER_FAILURE,
        payload: error.response.data.error_msg
      });
    }
  }, []);

  const addUser = useCallback(async (data) => {
    dispatch({
      type: types.USER_START
    });
    try {
      const res = await ClientAPI.post('/api/auth/register', data);
      dispatch({
        type: types.USER_ADD,
        payload: res.data.data
      });
    } catch (error) {
      dispatch({
        type: types.USER_FAILURE,
        payload: error.response.data.error_msg
      });
    }
  }, []);

  const fetchSingleUser = useCallback(async (id) => {
    dispatch({
      type: types.USER_START
    });
    const tempState = { ...state };
    if (!tempState.users) {
      try {
        const res = await ClientAPI.get(`/api/user/single/${id}`);
        dispatch({
          type: types.GET_USER,
          payload: res.data.data
        });
      } catch (error) {
        dispatch({
          type: types.USER_FAILURE,
          payload: error.response.data.error_msg
        });
      }
    } else {
      const user = tempState.filter((user) => user._id === id);
      dispatch({
        type: types.GET_USER,
        payload: user
      });
    }
  }, []);

  const editUserAction = useCallback(async (data) => {
    dispatch({
      type: types.USER_START
    });
    try {
      const res = await ClientAPI.patch('/api/user/edit-user', data);
      dispatch({
        type: types.USER_EDIT,
        payload: res.data.data
      });
    } catch (error) {
      dispatch({
        type: types.USER_FAILURE,
        payload: error.response.data.error_msg
      });
    }
  }, []);

  const deleteUserAction = useCallback(async (id) => {
    dispatch({
      type: types.USER_START
    });
    try {
      await ClientAPI.get(`/api/user/delete/${id}`);
      console.log(id);
      dispatch({
        type: types.USER_DELETE,
        payload: id
      });
    } catch (error) {
      dispatch({
        type: types.USER_FAILURE,
        payload: error.response.data.error_msg
      });
    }
  }, []);

  const changeUserPasswordAction = useCallback(async (data) => {
    dispatch({
      type: types.USER_START
    });
    try {
      await ClientAPI.post('/api/auth/change-password', data);
      dispatch({
        type: types.USER_PASSWORD_CHANGE
      });
    } catch (error) {
      dispatch({
        type: types.USER_FAILURE,
        payload: error.response.data.error_msg
      });
    }
    fetchSingleUser(data._id);
  }, []);

  useEffect(() => {
    fetchLoggedInUser();
    fetchUsers();
  }, []);

  return (
    <UserContext.Provider
      value={{
        state,
        fetchUsers,
        fetchSingleUser,
        editUserAction,
        changeUserPasswordAction,
        addUser,
        deleteUserAction,
        UserReset
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
