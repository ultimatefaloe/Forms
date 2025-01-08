import React, { useEffect, useReducer } from "react";

import { validate } from "../ulti/validators";

import './input.css';

const inputReducer = (state, action) => {
    switch (action.type){
        case 'CHANGE': 
            return{
                ...state,
                value: action.value,
                isValid: validate(action.value, action.validators)
            }
        case 'FOCUS':{
            return{
                ...state,
                isFocus: action.isFocus
            }
        }
        case 'BLUR':{
            return{
                ...state,
                isBlur: true
            }
        }
        default:
            return state
    }
}

const Input = props => {

    const [inputState, dispatch] = useReducer(inputReducer, {
        value: props.value || '',
        isValid: false,
        isFocus: false,
        isBlur: false
    });

    const inputChangeHandler = (e) =>{
       dispatch({
        type: 'CHANGE',
        value: e.target.value,
        validators: props.validators
       })
    //    props.onInput(props.id, e.target.value, inputState.isValid);
    };
    const focusHandler = () => {
        dispatch({
            type: 'FOCUS',
            isFocus: true
        })
    };
    const blurHandler = () => {
        dispatch({
            type: 'BLUR',
        })
    };

    const {onInput, id} = props;
    const {value, isValid} = inputState;

    useEffect(()=>{
        onInput(id, value, isValid);
    },[onInput, id, value, isValid]);
    
    const element = 
        props.element === 'input' ? (
            <input
                id={props.id}
                className={props.className}
                namec={props.name}
                type={props.type}
                value={inputState.value}
                onChange={inputChangeHandler}
                onFocus={focusHandler}
                onBlur={blurHandler}
            />
        ) : (
            <textarea 
                id={props.id}
                name={props.name}
                className={props.className}
                value={inputState.value}
                onChange={inputChangeHandler}
                onFocus={focusHandler}
                onBlur={blurHandler}
            />
        );
    
    return(
        <div className={`input_con ${props.className}`}>
            <div className="label_con">
                <label htmlFor={props.id}>{props.label}</label>
            </div>
            <div>
                {element}
            </div>
            <div className="err_danger">{ inputState.isBlur && !inputState.isValid && props.errorText}</div>
        </div>
    )
}

export default Input;