import React, { useEffect, useReducer } from 'react';

import { validate } from '../../ulti/validators'
import './input.css';

const inputReducer = (state, action) =>{
    switch(action.type){
        case 'CHANGE':
            return{
                ...state,
                value: action.value, 
                isValid: validate(action.value, action.isValid),
            };
        case 'FOCUS':
            return{
                ...state,
                isFocus: action.isFocus
            };
        case 'BLUR':
            return{
                ...state,
                isBlur: true,
            };
        default:
            return state
    };
};

const Input = props => {

    const [ inputState, dispatch ] = useReducer(inputReducer, {
        value:'',
        isValid:false, 
        isFocus:false,
        isBlur:false
    });
    const inputChangeHandler = (e) => {
        dispatch({
            type:'CHANGE',
            value: e.target.value,
            isValid: props.validators
        })
    };
    const onBlurHandler = () => {
        dispatch({
            type:'BLUR',
        })
    };
    const onFocusHandler = () => {
        dispatch({
            type:'FOCUS',
            isFocus: true
        })
    };

    const { id, onInput } = props;
    const { value, isValid } = inputState;

    useEffect(()=>{
        onInput(id, value, isValid)
    },[onInput, id, value, isValid]);

    const element = 
    (props.element === 'input') ? 
        <input 
            id={props.id} 
            className={`input ${props.className}`} 
            name={props.name} 
            type={props.type}
            value={inputState.value}
            onChange={inputChangeHandler}
            onFocus={onFocusHandler}
            onBlur={onBlurHandler} 
        /> : 
        <textarea 
            id={props.id} 
            rows={3 || props.rows}
            className={`textarea ${props.className}`} 
            name={props.name} 
            type={props.type}
            value={inputState.value}
            onChange={inputChangeHandler}
            onFocus={onFocusHandler}
            onBlur={onBlurHandler}
        />;
    
    return (
        <div className='input_con'>
            <div className='label'>{props.label}</div>
            <div>
                {element}
            </div>
            <div className='errText'>
                { inputState.isFocus && inputState.isBlur && !inputState.isValid && props.errorText}
            </div>

        </div>
    )
}
export default Input;