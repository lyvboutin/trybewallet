import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Table extends Component {
  state = {
    expensesRow: [],
  };

  componentDidUpdate(prevState) {
    const { arrayExpenses } = this.props;
    if (prevState.arrayExpenses !== arrayExpenses) {
      this.mapTable();
    }
  }

  mapTable = () => {
    const { arrayExpenses } = this.props;
    const mapped = arrayExpenses.map((expense) => {
      console.log('oi');
      const convertedValue = expense.value * expense.exchangeRates[expense.currency].ask;
      return (
        <tr key={ expense.id }>
          <td>{expense.description}</td>
          <td>{expense.tag}</td>
          <td>{expense.method}</td>
          <td>{parseFloat(expense.value).toFixed(2)}</td>
          <td>{expense.exchangeRates[expense.currency].name}</td>
          <td>{parseFloat(expense.exchangeRates[expense.currency].ask).toFixed(2)}</td>
          <td>{convertedValue.toFixed(2)}</td>
          <td>Real</td>
        </tr>
      );
    });
    this.setState({
      expensesRow: mapped,
    });
  };

  render() {
    const { expensesRow } = this.state;
    return (
      <div>
        <table>
          <thead>
            <tr>
              <th>Descrição</th>
              <th>Tag</th>
              <th>Método de pagamento</th>
              <th>Valor</th>
              <th>Moeda</th>
              <th>Câmbio utilizado</th>
              <th>Valor convertido</th>
              <th>Moeda de conversão</th>
              <th>Editar/Excluir</th>
            </tr>
          </thead>
          <tbody>
            {expensesRow}
          </tbody>
        </table>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  arrayExpenses: state.wallet.expenses,
});

Table.propTypes = {
  arrayExpenses: PropTypes
    .arrayOf(PropTypes.shape({ id: PropTypes.number.isRequired })).isRequired,
};

export default connect(mapStateToProps)(Table);
