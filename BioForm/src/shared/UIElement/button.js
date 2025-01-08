import React from "react";

import './button.css';
const Button = props => {
    return (
        <button
            className={`btn ${props.className}`}
            type={props.type}
            onClick={props.onClick}
            disabled={props.disabled}
        >
            {props.children}
        </button>
    )
}

export default Button;