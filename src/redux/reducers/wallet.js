// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import { RECEIVE_CURRENCIES, RECEIVE_EXPENSES } from '../actions';

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
  default:
    return state;
  }
};

export default wallet;
