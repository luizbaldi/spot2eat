import React, { Component } from 'react';

/* Components */
import FullScreenContainer from '../components/FullScreenContainer';
import Button from '../components/Button';

/* Libs */
import swal from 'sweetalert2';
import { auth } from '../util/fire';
import styled from 'styled-components';

/* Redux */
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setUser } from '../actions/UserActions';

class SignUp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      email: '',
      password: '',
      isLoading: false
    };

    this.onFieldChange = this.onFieldChange.bind(this);
    this.signUp = this.signUp.bind(this);
    this.setLoadingState = this.setLoadingState.bind(this);
    this.goBack = this.goBack.bind(this);
  }
  setLoadingState(loadingState) {
    this.setState({
      isLoading: loadingState
    });
  }
  onFieldChange({ target }) {
    this.setState({
      [target.name]: target.value
    });
  }
  signUp() {
    let name = this.state.name;
    let email = this.state.email;
    let password = this.state.password;
    if (name && email && password) {
      this.setLoadingState(true);
      auth.createUserWithEmailAndPassword(email, password).then(response => {
        this.setLoadingState(false);
        this.props.setUser({ name, email, password, id: response.uid });
        this.props.history.push('/dashboard');
        swal(
          'Successo!',
          'Bem vindo ao barco :)',
          'success'
        );
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
        '',
        'Por favor, preencha todos os campos para prosseguir.',
        'info'
      );
    }
  }
  goBack() {
    this.props.history.goBack();
  }
  render() {
    return (
      <FullScreenContainer {...this.props} loadingState={this.state.isLoading}>
        <Content>
          <span>Cadastre-se abaixo :)</span>
          <Form>
            <Row>
              <input
                placeholder="Nome"
                onChange={this.onFieldChange}
                name="name"
              />
            </Row>
            <Row>
              <input
                placeholder="E-mail"
                onChange={this.onFieldChange}
                name="email"
              />
            </Row>
            <Row>
              <input
                placeholder="Senha"
                onChange={this.onFieldChange}
                name="password"
              />
            </Row>
            <Row>
              <Button
                label="Voltar"
                onClick={this.goBack}
                halfWidth
              />
              <Button
                label="Cadastrar"
                onClick={this.signUp}
                halfWidth
              />
            </Row>
          </Form>
        </Content>
      </FullScreenContainer>
    );
  }
};

/* Styled Components */
const Content = styled.div`
  bottom: 50px;
  left: 25px;
  position: absolute;
  right: 25px;
  text-align: center;

  > span {
    display: block;
    margin-bottom: 32px;
    font-size: 1.4em;
  }
`;

const Form = styled.form`
  margin: 0 auto;
  max-width: 450px;
  width: 100%;
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

const mapDispatchToProps = dispatch => bindActionCreators({ setUser }, dispatch);

export default connect(null, mapDispatchToProps)(SignUp);
