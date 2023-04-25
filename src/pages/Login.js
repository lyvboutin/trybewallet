import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addEmail } from '../redux/actions';

class Login extends React.Component {
  state = {
    formValid: false,
    email: '',
    password: '',
  };

  handleChange = (event) => {
    const { name, value } = event.target;
    const { email, password } = this.state;
    this.setState({
      [name]: value,
    });
    if (this.isValidEmail(email) && this.isValidPassword(password)) {
      this.setState({
        formValid: true,
      });
    } else {
      this.setState({
        formValid: false,
      });
    }
  };

  isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  isValidPassword = (password) => {
    const five = 5;
    return password.length >= five;
  };

  handleLoginClick = (event) => {
    event.preventDefault();
    const { history, dispatch } = this.props;
    const { email } = this.state;
    dispatch(addEmail(email));
    history.push('/carteira');
  };

  render() {
    const { formValid } = this.state;
    return (
      <div>
        <form>
          <label>
            E-mail
            <input
              name="email"
              type="text"
              data-testid="email-input"
              onChange={ this.handleChange }
            />
          </label>
          <label>
            Senha
            <input
              name="password"
              type="password"
              data-testid="password-input"
              onChange={ this.handleChange }
            />
          </label>
          <button
            disabled={ !formValid }
            onClick={ this.handleLoginClick }
          >
            Entrar
          </button>
        </form>
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect()(Login);
