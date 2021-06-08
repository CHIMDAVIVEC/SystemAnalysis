import React, {
  createContext,
  useReducer,
  useEffect,
  useCallback
} from 'react';
import problemReducer from './problemReducer';
import * as types from './problemActionTypes';
import ClientAPI from '../../helpers/apiUtils';

const initialProblemState = {
  loading: false,
  error: false,
  problems: '',
  problem: null,
  errResponse: '',
  message: null
};

export const ProblemContext = createContext(initialProblemState);

//Функции отправки запросов и заполнения контекста в зависимости от ответа сервера
export const ProblemProvider = ({ children }) => {
  const [state, dispatch] = useReducer(problemReducer, initialProblemState);

  const ProblemReset = () => {
    dispatch({
      type: types.PROBLEM_RESET
    });
  };
  //Получение списка проблем
  const fetchProblems = useCallback(async () => {
    dispatch({
      type: types.PROBLEM_START
    });
    try {
      const res = await ClientAPI.get('/api/problem/');
      dispatch({
        type: types.PROBLEM_SUCCESS,
        payload: res.data.data
      });
    } catch (error) {
      dispatch({
        type: types.PROBLEM_FAILURE,
        payload: error.response.data.error_msg
      });
    }
  }, []);
  //Добавление проблемы
  const addProblem = useCallback(async (data) => {
    dispatch({
      type: types.PROBLEM_START
    });
    try {
      const res = await ClientAPI.post('/api/problem/add', data);
      dispatch({
        type: types.PROBLEM_ADD,
        payload: res.data.data
      });
    } catch (error) {
      dispatch({
        type: types.PROBLEM_FAILURE,
        payload: error.response.data.error_msg
      });
    }
  }, []);
  //Получение конкретной проблемы
  const fetchSingleProblem = useCallback(async (id) => {
    dispatch({
      type: types.PROBLEM_START
    });
    try {
      const res = await ClientAPI.get(`/api/problem/single/${id}`);
      dispatch({
        type: types.GET_PROBLEM,
        payload: res.data.data
      });
    } catch (error) {
      dispatch({
        type: types.PROBLEM_FAILURE,
        payload: error.response.data.error_msg
      });
    }
  }, []);
  //Изменение проблемы
  const editProblem = useCallback(async (data) => {
    dispatch({
      type: types.PROBLEM_START
    });
    try {
      const res = await ClientAPI.patch('/api/problem/edit', data);
      dispatch({
        type: types.PROBLEM_EDIT,
        payload: res.data.data
      });
    } catch (error) {
      dispatch({
        type: types.PROBLEM_FAILURE,
        payload: error.response.data.error_msg
      });
    }
  }, []);
  //Задание статуса "Решена" проблеме
  const setSolved = useCallback(async (data) => {
    dispatch({
      type: types.PROBLEM_START
    });
    try {
      const res = await ClientAPI.patch('/api/problem/solved', data);
      dispatch({
        type: types.PROBLEM_EDIT,
        payload: res.data.data
      });
    } catch (error) {
      dispatch({
        type: types.PROBLEM_FAILURE,
        payload: error.response.data.error_msg
      });
    }
  }, []);
  //Изменение решения проблемы
  const editProblemSolution = useCallback(async (data) => {
    dispatch({
      type: types.PROBLEM_START
    });
    try {
      const res = await ClientAPI.patch('/api/problem/solution', data);
      dispatch({
        type: types.PROBLEM_EDIT,
        payload: res.data.data
      });
    } catch (error) {
      dispatch({
        type: types.PROBLEM_FAILURE,
        payload: error.response.data.error_msg
      });
    }
  }, []);
  //Удаление проблемы
  const deleteProblem = useCallback(async (id) => {
    dispatch({
      type: types.PROBLEM_START
    });
    try {
      await ClientAPI.get(`/api/problem/delete/${id}`);
      dispatch({
        type: types.PROBLEM_DELETE,
        payload: id
      });
    } catch (error) {
      dispatch({
        type: types.PROBLEM_FAILURE,
        payload: error.response.data.error_msg
      });
    }
  }, []);

  useEffect(() => {
    fetchProblems();
  }, []);

  return (
    <ProblemContext.Provider
      value={{
        state,
        fetchProblems,
        fetchSingleProblem,
        editProblem,
        editProblemSolution,
        setSolved,
        addProblem,
        deleteProblem,
        ProblemReset
      }}
    >
      {children}
    </ProblemContext.Provider>
  );
};
