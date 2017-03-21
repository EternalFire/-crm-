import React from 'react'
import {Modal} from 'antd'

export default class ModalWrapper extends React.Component {
  state = { 
    visible: false 
  }

  componentWillReceiveProps(nextProps) {
    console.log('componentWillReceiveProps', nextProps)
    this.setState({ visible: nextProps.visible });
  }

  // shouldComponentUpdate(nextProps, nextState) {
  //   console.log('shouldComponentUpdate', nextProps, nextState)
    
  //   return 
  // }

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
    console.log(this.props)

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

