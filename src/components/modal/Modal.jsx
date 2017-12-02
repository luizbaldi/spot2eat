import React, { Component } from 'react';
import Modal from 'react-modal';

const modal = (WrappedComponent) => {
  return class extends Component {
    render() {
      return (
        <Modal isOpen={this.props.isOpen}>
          <WrappedComponent {...this.props} /> 
        </Modal>
      );
    }
  }
}

export default modal;