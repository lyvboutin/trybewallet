import getCurrencyInfo from '../../services/currencyAPI';

export const ADD_EMAIL = 'ADD_EMAIL';
export const RECEIVE_CURRENCIES = 'RECEIVE_CURRENCIES';

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

// {
//   USD: { },
//   ARS: { },
// }
