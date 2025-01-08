import React, { useCallback, useReducer, useState } from 'react';

import './App.css';
import Input from './shared/UIElement/input';
import Button from './shared/UIElement/button';
import {
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE
} from './shared/ulti/validators';

const formReducer = (state, action) =>{
  switch(action.type){
    case 'INPUT_CHANGE':
      const updatedData = {
        ...state.inputs,
        [action.id]: {value: action.value, isValid: action.isValid}
      }
      const formIsValid = Object.values(updatedData).every((input) => input.isValid);

      return{
        ...state,
        inputs: updatedData,
        formIsValid: formIsValid
      }
    case 'SET_DATA': 
      return{
        ...state,
        inputs: action.inputs,
        formIsValid: Object.values(action.inputs).every((input) => input.isValid)
      }
    default: 
      return state
  }
};


function App() {

  const [loginMode, setLoginMode] = useState(true);
  
  const [formState, dispatch] = useReducer(formReducer, {
    inputs:{
      email:{value:'', isValid:false},
      password:{value:'', isValid:false},
      // name:{value:'', isValid:false}
    },
    formIsValid: false,
  });

  const inputHandler = useCallback((id, value, isValid) =>{
    dispatch({
      type: 'INPUT_CHANGE',
      id: id,
      value: value,
      isValid: isValid
    })
  },[]);

  const switchModeHandler = useCallback(() => {
    const {name, ...updatedData} = formState.inputs
    if( loginMode ){
      dispatch({
        type:'SET_DATA',
        inputs:{
          ...formState.inputs,
          name: {
            name: '',
            isValid: false
          }
        },
      })
    } else {
      dispatch({
        type:'SET_DATA',
        inputs: updatedData,
      })
    };
    setLoginMode((prev) => !prev);
  }, [loginMode,formState.inputs]); // Depend on loginMode to log the correct value inside the callback

  const formSubmitHandler = (e) => {
    e.preventDefault();
    if(formState.formIsValid){
      console.log('Form Submit Successfully.', formState)
      return
    };
    console.log('Form Submission failed!', formState)
  };

  return (
    <div className="App">
      <header className="App-header">
        <div className="App-con">
          <form onSubmit={formSubmitHandler}>
            { !loginMode && <Input 
              element='input'
              id='name'
              name='name'
              type='text'
              value={formState.inputs.name?.value || ''}
              validators= {[VALIDATOR_REQUIRE()]}
              errorText='Please enter a valid name'
              onInput={inputHandler}
            /> }
            <Input 
              element='input'
              id='email'
              name='email'
              type='email'
              value={formState.inputs.email?.value || ''}
              validators= {[VALIDATOR_REQUIRE(), VALIDATOR_EMAIL()]}
              errorText='Please enter a valid email'
              onInput={inputHandler}
            />
            <Input 
              element='input'
              id='password'
              name='password'
              type='password'
              validators= {[VALIDATOR_REQUIRE(), VALIDATOR_MINLENGTH(6)]}
              value={formState.inputs.password?.value || ''}
              errorText='Please enter a password of atleast 6 characters long'
              onInput={inputHandler}
            />
            <Button type='submit' disabled={ !formState.formIsValid } > { loginMode ? 'LOGIN' : 'SIGNUP' } </Button>
            <Button type='button' onClick={switchModeHandler} > { loginMode ? 'SIGNUP' : 'LOGIN' } </Button>
          </form>
        </div>
      </header>
    </div>
  );
}

export default App;
