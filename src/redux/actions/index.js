import getCurrencyInfo from '../../services/currencyAPI';

export const ADD_EMAIL = 'ADD_EMAIL';
export const RECEIVE_CURRENCIES = 'RECEIVE_CURRENCIES';
export const RECEIVE_EXPENSES = 'RECEIVE_EXPENSES';
export const DELETE_EXPENSE = 'DELETE_EXPENSE';

export const addEmail = (email) => ({
  type: ADD_EMAIL,
  email,
});

export const receiveCurrencies = (currencies) => ({
  type: RECEIVE_CURRENCIES,
  currencies,
});

export const getCurrencies = () => async (dispatch) => {
  const API = await getCurrencyInfo();
  const keysAPI = Object.keys(API);
  const filteredKeys = keysAPI.filter((key) => (key !== 'USDT'));
  dispatch(receiveCurrencies(filteredKeys));
};

export const receiveExpenses = (expense, total) => ({
  type: RECEIVE_EXPENSES,
  expense,
  total,
});

export const deleteExpenseTarget = (id, value) => ({
  type: DELETE_EXPENSE,
  id,
  value,
});

export const getExpenses = (formInfo) => async (dispatch) => {
  const API = await getCurrencyInfo();
  let total = 0;
  const { ask } = API[formInfo[1]];
  total += (formInfo[4] * ask);
  const expenseObject = {
    id: formInfo[0],
    value: formInfo[4],
    description: formInfo[5],
    currency: formInfo[1],
    method: formInfo[2],
    tag: formInfo[3],
    exchangeRates: { ...API },
  };
  dispatch(receiveExpenses(expenseObject, total));
};

// {
//   USD: { },
//   ARS: { },
// }
