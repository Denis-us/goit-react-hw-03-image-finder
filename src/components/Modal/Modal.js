import React, { Component } from "react";
import { createPortal } from "react-dom";
import styles from "./Modal.module.css";
import PropTypes from "prop-types";

const modalRoot = document.querySelector("#modal-root");

export default class Modal extends Component {
  static propTypes = {
    onClose: PropTypes.func.isRequired,
    children: PropTypes.node.isRequired,
  };

  componentDidMount() {
    window.addEventListener("keydown", this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener("keydown", this.handleKeyDown);
  }

  handleKeyDown = (e) => {
    if (e.code === "Escape") {
      this.props.onClose();
    }
  };

  handleBackdropClick = (e) => {
    if (e.currentTarget === e.target) {
      this.props.onClose();
    }
  };

  render() {
    const { children } = this.props;
    return createPortal(
      <div className={styles.Overlay} onClick={this.handleBackdropClick}>
        <div className={styles.Modal}>{children}</div>
      </div>,
      modalRoot
    );
  }
}
