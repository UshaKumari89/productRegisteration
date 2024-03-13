// import React from 'react';
// import  "./Button.scss"
// const Button = ({ label, onClick }) => {
//   return (
//     <button onClick={onClick} className='butn'>
//       {label}
//     </button>
//   );
// };

// export default Button;
import React from "react";
import "./Button.scss";

const Button = ({ label, type, disabled, loggingIn, onClick }) => {
  return (
    <button className={`butn ${loggingIn ? "logging-in" : ""}`} type={type} disabled={disabled} onClick={onClick} >
      {label}
    </button>
  );
};

export default Button;
