import React, { createContext, useReducer, useCallback } from 'react';
import axios from 'axios';
import * as types from './RegistrationActionTypes';
import userReducer from './RegistrationReducer';

const initialRegistrationState = {
  loading: false,
  error: false,
  success: false,
  errResponse: null,
};

export const RegistrationContext = createContext(initialRegistrationState);

export const RegistrationProvider = ({ children }) => {
  const [state, dispatch] = useReducer(userReducer, initialRegistrationState);

  const RegAction = useCallback(async (data) => {
    dispatch({
      type: types.REG_START
    });
    try {
      await axios.post('/api/auth/register', data);
      dispatch({
        type: types.REG_SUCCESS
      });
    } catch (error) {
      dispatch({
        type: types.REG_FAILURE,
        payload: error.response.data.error_msg
      });
    }
  }, []);

  return (
    <RegistrationContext.Provider
      value={{
        state,
        RegAction
      }}
    >
      {children}
    </RegistrationContext.Provider>
  );
};
