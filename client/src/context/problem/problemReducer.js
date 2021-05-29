import * as types from './problemActionTypes';

//Описание заполнения контекста в зависимости от типа действия
export default (state, action) => {
  switch (action.type) {
    case types.PROBLEM_START:
      return {
        ...state,
        loading: true,
        message: null,
        problem: null,
        error: null
      };

    case types.PROBLEM_SUCCESS:
      return {
        ...state,
        loading: false,
        problems: action.payload
      };
      
    case types.GET_PROBLEM:
      return {
        ...state,
        loading: false,
        problem: action.payload,
        error: false,
        errResponse: ''
      };

    case types.PROBLEM_ADD:
      return {
        ...state,
        problems: [action.payload, ...state.problems],
        loading: false,
        error: false,
        errResponse: '',
        message: 'Проблема успешно добавлена!'
      };

    case types.PROBLEM_EDIT:

      return {
        ...state,
        loading: false,
        error: false,
        errResponse: '',
        problem: action.payload,
        message: 'Изменения успешно внесены!'
      };

    case types.PROBLEM_DELETE:
      return {
        ...state,
        loading: false,
        error: false,
        errResponse: '',
        problem: null,
        message: 'Проблема успешно удалена!'
      };

    case types.PROBLEM_FAILURE:
      return {
        ...state,
        loading: false,
        error: true,
        errResponse: action.payload
      };
      
    case types.PROBLEM_RESET:
      return {
        ...state,
        loading: false,
        error: false,
        errResponse: '',
        message: null
      };

    default:
      return state;
  }
};
