import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getCurrencies } from '../redux/actions';

class WalletForm extends Component {
  state = {
    currencies: [],
    coinSelect: 'USD',
    methodInput: 'Dinheiro',
    tagInput: 'Alimentação',
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

  render() {
    const { currencies, coinSelect, methodInput, tagInput } = this.state;
    return (
      <div>
        <form>
          <label htmlFor="">
            Valor
            <input
              type="text"
              name="valueInput"
              data-testid="value-input"
              onChange={ this.handleChange }
            />
          </label>
          <label htmlFor="">
            Descrição
            <input
              type="text"
              name="descriptionInput"
              data-testid="description-input"
              onChange={ this.handleChange }
            />
          </label>
          <label htmlFor="">
            Moeda
            <select
              name="coinSelect"
              data-testid="currency-input"
              value={ coinSelect }
            >
              {currencies}
            </select>
          </label>
          <label htmlFor="">
            <select
              name="methodInput"
              data-testid="method-input"
              value={ methodInput }
            >
              <option value="Dinheiro">Dinheiro</option>
              <option value="Cartão de crédito">Cartão de crédito</option>
              <option value="Cartão de débito">Cartão de débito</option>
            </select>
          </label>
          <label htmlFor="">
            <select
              name="tagInput"
              data-testid="tag-input"
              value={ tagInput }
            >
              <option value="Alimentação">Alimentação</option>
              <option value="Lazer">Lazer</option>
              <option value="Trabalho">Trabalho</option>
              <option value="Transporte">Transporte</option>
              <option value="Saúde">Saúde</option>
            </select>
          </label>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
});

WalletForm.propTypes = {
  dispatch: PropTypes.func.isRequired,
  currencies: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
};

export default connect(mapStateToProps)(WalletForm);
