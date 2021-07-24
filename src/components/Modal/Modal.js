import React, { Component } from "react";
import styles from "./Modal.module.css";

export default class Modal extends Component {
  componentDidMount() {
    console.log("componentDidMount");
  }

  componentWillUnmount() {
    console.log("componentWillUnmount");
  }

  render() {
    return (
      <div className={styles.backdrop}>
        <div className={styles.modal}>{this.props.children}</div>
      </div>
    );
  }
}
