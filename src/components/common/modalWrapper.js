import React from 'react'
import {Modal} from 'antd'

export default class ModalWrapper extends React.Component {
  state = { 
    visible: true 
  }

  handleOk = () => {
    this.setState({
      visible: false,
    });

    if (this.props.handleOk) {
      this.props.handleOk();
    }
  }

  handleCancel = () => {
    this.setState({
      visible: false,
    });

    if (this.props.handleCancel) {
      this.props.handleCancel();
    }
  }

  render() {
    const {visible} = this.state;

    const props = {
      ...this.props, 

      visible: visible,
      onOk: this.handleOk, 
      onCancel: this.handleCancel
    };

    return (
      <Modal {...props} 
      >
        {props.children}
      </Modal>
    );
  }
}

