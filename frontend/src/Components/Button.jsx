import React from "react";
import "./Button.scss";

const Button = ({ label, type, disabled, loggingIn, onClick, className }) => {
  return (
    <button className={`butn ${loggingIn ? "logging-in" : ""} ${className}`} type={type} disabled={disabled} onClick={onClick} >
      {label}
    </button>
  );
};

export default Button;
