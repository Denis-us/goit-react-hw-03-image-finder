import React from "react";
// import styles from "./Button.module.css";

const Button = ({ onClick, content }) => {
  return (
    <button type="button" onClick={onClick}>
      {content}
    </button>
  );
};

export default Button;
