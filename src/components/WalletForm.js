import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getCurrencies, getExpenses } from '../redux/actions';

class WalletForm extends Component {
  state = {
    currencies: [],
    coinSelect: 'USD',
    methodInput: 'Dinheiro',
    tagInput: 'Alimentação',
    valueInput: '',
    descriptionInput: '',
  };

  async componentDidMount() {
    const { dispatch } = this.props;
    await dispatch(getCurrencies());
    this.mapCurrencies();
  }

  mapCurrencies = () => {
    const { currencies } = this.props;
    const mapCurrencies = currencies.map((currency) => (
      <option value={ currency } key={ currency }>{currency}</option>
    ));
    this.setState({
      currencies: mapCurrencies,
    });
  };

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  };

  handleExpenses = (event) => {
    event.preventDefault();
    const { dispatch, arrayExpenses } = this.props;
    const { coinSelect,
      methodInput,
      tagInput,
      valueInput,
      descriptionInput } = this.state;
    const formInfo = [
      arrayExpenses.length,
      coinSelect,
      methodInput,
      tagInput,
      valueInput,
      descriptionInput,
    ];
    dispatch(getExpenses(formInfo));
    this.setState({
      coinSelect: 'USD',
      methodInput: 'Dinheiro',
      tagInput: 'Alimentação',
      valueInput: '',
      descriptionInput: '',
    });
  };

  render() {
    const { currencies,
      coinSelect,
      methodInput,
      tagInput,
      valueInput,
      descriptionInput } = this.state;
    return (
      <div>
        <form>
          <label>
            Valor
            <input
              type="text"
              name="valueInput"
              value={ valueInput }
              data-testid="value-input"
              placeholder="Valor"
              onChange={ this.handleChange }
            />
          </label>
          <label>
            Descrição
            <input
              type="text"
              name="descriptionInput"
              value={ descriptionInput }
              data-testid="description-input"
              placeholder="Descrição"
              onChange={ this.handleChange }
            />
          </label>
          <label>
            Moeda
            <select
              name="coinSelect"
              data-testid="currency-input"
              value={ coinSelect }
              onChange={ this.handleChange }
            >
              {currencies}
            </select>
          </label>
          <label>
            Método de pagamento
            <select
              name="methodInput"
              data-testid="method-input"
              value={ methodInput }
              onChange={ this.handleChange }
            >
              <option value="Dinheiro">Dinheiro</option>
              <option value="Cartão de crédito">Cartão de crédito</option>
              <option value="Cartão de débito">Cartão de débito</option>
            </select>
          </label>
          <label>
            Tag
            <select
              name="tagInput"
              data-testid="tag-input"
              value={ tagInput }
              onChange={ this.handleChange }
            >
              <option value="Alimentação">Alimentação</option>
              <option value="Lazer">Lazer</option>
              <option value="Trabalho">Trabalho</option>
              <option value="Transporte">Transporte</option>
              <option value="Saúde">Saúde</option>
            </select>
          </label>
          <button
            onClick={ this.handleExpenses }
          >
            Adicionar despesa
          </button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
  arrayExpenses: state.wallet.expenses,
});

WalletForm.propTypes = {
  dispatch: PropTypes.func.isRequired,
  currencies: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  arrayExpenses: PropTypes
    .arrayOf(PropTypes.shape({ id: PropTypes.number.isRequired })).isRequired,
};

export default connect(mapStateToProps)(WalletForm);
