// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import { RECEIVE_CURRENCIES, RECEIVE_EXPENSES, DELETE_EXPENSE } from '../actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  total: 0,
};

const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case RECEIVE_CURRENCIES:
    return {
      ...state, currencies: action.currencies,
    };
  case RECEIVE_EXPENSES:
    return {
      ...state,
      expenses: [...state.expenses, action.expense],
      total: state.total + action.total,
    };
  case DELETE_EXPENSE: {
    return {
      ...state,
      expenses: state.expenses
        .filter((expense) => expense.id !== action.id),
      total: Math.abs(state.total - action.value),
    };
  }
  default:
    return state;
  }
};

export default wallet;
