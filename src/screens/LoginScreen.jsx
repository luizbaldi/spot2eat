import React, { Component } from 'react';

/* Components */
import FullScreenContainer from '../components/FullScreenContainer';
import Button from '../components/Button';

/* Libs */
import swal from 'sweetalert2';
import { Link } from 'react-router-dom';
import { auth } from '../util/fire';
import project from '../../package.json';
import styled from 'styled-components';

/* Redux */
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setUser } from '../actions/UserActions';
import { loadSpots } from '../actions/SpotsActions';

class LoginScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      isLoading: false
    };

    this.validateLogin = this.validateLogin.bind(this);
    this.onFieldChange = this.onFieldChange.bind(this);
    this.setLoadingState = this.setLoadingState.bind(this);
  }
  setLoadingState(loadingState) {
    this.setState({
      isLoading: loadingState
    });
  }
  validateLogin() {
    let email = this.state.email;
    let password = this.state.password;
    if (email && password) {
      this.setLoadingState(true);
      auth.signInWithEmailAndPassword(email, password).then(response => {
        this.props.setUser({ email, password, id: response.uid });
        this.setLoadingState(false);
        swal(
          '',
          `Bem vindo :)`,
          'success'
        );
        this.props.loadSpots({ email, password });
        this.props.history.push('/dashboard');
      })
        .catch(err => {
          this.setLoadingState(false);
          swal(
            'Ops',
            err.message,
            'error'
          );
        });
    } else {
      swal(
        'Ops...',
        'Por favor digite seu e-mail e senha para prosseguir :)',
        'info'
      );
    }
  }
  onFieldChange({ target }) {
    this.setState({
      [target.name]: target.value
    });
  }
  testLogin() {
    const loginData = { id: "PUH15JX3NMOiV7FyD6t2wwtknPl2", email: "admin", password: "123" };
    swal(
      '',
      `Bem vindo :)`,
      'success'
    );
    this.props.setUser(loginData);
    this.props.loadSpots(loginData);
    this.props.history.push('/dashboard');
  }
  render() {
    return (
      <FullScreenContainer {...this.props} loadingState={this.state.isLoading}>
        <Content>
          <Form>
            <img alt="Spot2Eat" src="img/color-logo-764x223.png" />
            <Version>v{project.version}</Version>
            <Row>
              <input
                placeholder="Usuário"
                onChange={this.onFieldChange}
                name="email" />
            </Row>
            <Row>
              <input type="password"
                placeholder="Senha"
                onChange={this.onFieldChange}
                name="password" />
            </Row>
            <Row>
              <Button
                label="Login"
                onClick={this.validateLogin}
                style={styles.button}
              />
            </Row>
            <Row>
              <Button
                label="Login Teste"
                onClick={() => this.testLogin()}
                style={styles.button}
              />
            </Row>
            <Row>
              <Link style={styles.signUp} to="/signup"><span>Ou crie uma conta clicando aqui</span></Link>
            </Row>
          </Form>
        </Content>
      </FullScreenContainer>
    );
  }
};

/* Styled Components */
const Content = styled.div`
  bottom: 10px;
  left: 25px;
  position: absolute;
  right: 25px;
`;

const Form = styled.form`
  margin: 0 auto;
  max-width: 450px;
  width: 100%;

  > img {
    width: 100%;
  }
`;

const Row = styled.div`
  margin-bottom: 7px;
  width: 100%;

  > input {
    background: white;
    border: none;
    border-radius: 22px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, .5);
    display: block;
    height: 44px;
    font-size: 16px;
    padding: 0 22px;
    width: 100%;
  }
`;

const Version = styled.span`
  color: #101010;
  font-weight: bold;
  position: absolute;
  right: 0;
  bottom: 0;
`;

const styles = {
  signUp: {
    color: 'white',
    display: 'inline-block',
    lineHeight: '44px',
    textDecoration: 'none',
    textAlign: 'center',
    width: '100%'
  },

  button: {
    width: '100%'
  }
};

const mapDispatchToProps = (dispatch) => bindActionCreators({ loadSpots, setUser }, dispatch);

export default connect(null, mapDispatchToProps)(LoginScreen);
