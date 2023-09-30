import React from 'react';
import './Button.css';

type ButtonProps = {
  children: React.ReactNode;
  classnames?: string;
  onClick?: () => void;
};

const Button: React.FC<ButtonProps> = (props) => {
  return (
    <button {...props} className={'button' + props.classnames}>
      {props.children}
    </button>
  );
};

export default Button;
