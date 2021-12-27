import React from "react";
import { Modal } from "react-native";

export class JoinModal extends React.Component {
  constructor(props) {
    super(props);
  }

  show = () => {
    this.setState({ show: true });
  };

  close = () => {
    this.setState({ show: false });
  };

  render() {
      let (show) = this.state
    return (
      <Modal
        animationType={"fade"}
        transparent={true}
        visible={show}
        onRequestClose={this.close}
      ></Modal>
    );
  }
}
