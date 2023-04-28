// Este requisito foi feito com a ajuda de um colega da Trybe.

import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Wallet from '../pages/Wallet';
import App from '../App';
import { renderWithRouterAndRedux } from './helpers/renderWith';

const emailValid = 'teste@teste.com';
const passwordValid = '1234567';

describe('Testa a Página de Login', () => {
  it('Testa se os campos do Formulário existem.', () => {
    renderWithRouterAndRedux(<App />);

    const inputEmail = screen.getByText(/e-mail/i);
    const inputPassword = screen.getByText(/senha/i);
    const buttonFormLogin = screen.getByRole('button', { name: /entrar/i });

    expect(inputEmail).toBeInTheDocument();
    expect(inputPassword).toBeInTheDocument();
    expect(buttonFormLogin).toBeInTheDocument();
  });

  it('Testa se o botão é habilitado após a digitação e se a rota é direcionada corretamente.', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    const inputEmail = screen.getByLabelText(/e-mail/i);
    const inputPassword = screen.getByLabelText(/senha/i);
    const buttonFormLogin = screen.getByRole('button', { name: /entrar/i });

    expect(inputEmail).toBeInTheDocument();
    expect(inputPassword).toBeInTheDocument();
    expect(buttonFormLogin).toBeInTheDocument();

    userEvent.type(inputEmail, emailValid);
    userEvent.type(inputPassword, passwordValid);

    expect(buttonFormLogin).toBeEnabled();

    userEvent.click(buttonFormLogin);

    const { pathname } = history.location;
    expect(pathname).toBe('/carteira');
  });
});

describe('Testa a página da carteira', () => {
  it('Testa se todos os elementos do header estão renderizados na tela', () => {
    renderWithRouterAndRedux(<App />);
    const inputEmail = screen.getByLabelText(/e-mail/i);
    const inputPassword = screen.getByLabelText(/senha/i);
    const buttonFormLogin = screen.getByRole('button', { name: /entrar/i });

    expect(inputEmail).toBeInTheDocument();
    expect(inputPassword).toBeInTheDocument();
    expect(buttonFormLogin).toBeInTheDocument();

    userEvent.type(inputEmail, emailValid);
    userEvent.type(inputPassword, passwordValid);
    userEvent.click(buttonFormLogin);

    const email = screen.getByText(/teste@teste\.com/i);
    const valueInitial = screen.getByText(/0\.00/i);
    const coinInitial = screen.getByText(/brl/i);
    const valueInputForm = screen.getByRole('textbox', { name: /valor/i });
    const descriptionInputForm = screen.getByRole('textbox', { name: /descrição/i });
    const inputCoinForm = screen.getByRole('combobox', { name: /moeda/i });
    // const inputMethodForm = screen.getByLabelText(/metódo de pagamento/i);
    const inputTagForm = screen.getByRole('combobox', { name: /tag/i });
    const inputButtonForm = screen.getByRole('button', { name: /adicionar despesa/i });

    expect(email).toBeInTheDocument();
    expect(valueInitial).toBeInTheDocument();
    expect(coinInitial).toBeInTheDocument();
    expect(valueInputForm).toBeInTheDocument();
    expect(descriptionInputForm).toBeInTheDocument();
    expect(inputCoinForm).toBeInTheDocument();
    // expect(inputMethodForm).toBeInTheDocument();
    expect(inputTagForm).toBeInTheDocument();
    expect(inputButtonForm).toBeInTheDocument();
  });

  it('testa se a tabela é renderizada corretamente', () => {
    renderWithRouterAndRedux(<Wallet />);

    const descriptionHead = screen.getByRole('columnheader', { name: /descrição/i });
    const tagHead = screen.getByRole('columnheader', { name: /tag/i });
    const methodHead = screen.getByRole('columnheader', { name: /método de pagamento/i });
    const value = screen.getByRole('columnheader', { name: 'Valor' });
    const coinHead = screen.getByRole('columnheader', { name: 'Moeda' });
    const exchangeHead = screen.getByRole('columnheader', { name: /câmbio utilizado/i });
    const convertedHead = screen.getByRole('columnheader', { name: 'Valor convertido' });
    const conversionCoinHead = screen.getByRole('columnheader', { name: 'Moeda de conversão' });
    const excludeHead = screen.getByRole('columnheader', { name: /editar\/excluir/i });

    expect(descriptionHead).toBeInTheDocument();
    expect(tagHead).toBeInTheDocument();
    expect(methodHead).toBeInTheDocument();
    expect(value).toBeInTheDocument();
    expect(coinHead).toBeInTheDocument();
    expect(exchangeHead).toBeInTheDocument();
    expect(convertedHead).toBeInTheDocument();
    expect(conversionCoinHead).toBeInTheDocument();
    expect(excludeHead).toBeInTheDocument();
  });

  it('Verifica se a despesa é exibida corretamente', async () => {
    renderWithRouterAndRedux(<Wallet />);
    await waitFor(() => {
      const selectCurrency = screen.getByTestId('currency-input');
      expect(selectCurrency).toBeInTheDocument();

      const optionCoin = selectCurrency.querySelector('option:first-of-type');
      expect(optionCoin.value).toBe('USD');
    });

    const valueExpense = screen.getByLabelText(/valor/i);
    const descriptionExpense = screen.getByRole('textbox', { name: /Descrição/i });
    const buttonExpense = screen.getByRole('button', { name: /adicionar despesa/i });

    userEvent.type(valueExpense, '50');
    userEvent.type(descriptionExpense, 'Paris');
    userEvent.click(buttonExpense);

    await waitFor(() => {
      const expenseTableValue = screen.getByRole('cell', { name: /50/i });
      const expenseTableDescription = screen.getByRole('cell', { name: /Paris/i });
      const deleteBtn = screen.getByRole('button', { name: /delete/i });

      expect(deleteBtn).toBeInTheDocument();
      expect(expenseTableValue).toBeInTheDocument();
      expect(expenseTableDescription).toBeInTheDocument();

      userEvent.click(deleteBtn);

      expect(expenseTableValue).not.toBeInTheDocument();
      expect(expenseTableDescription).not.toBeInTheDocument();
    });
  });
});
