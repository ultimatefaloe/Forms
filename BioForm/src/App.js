import { useCallback, useReducer } from 'react';
import './App.css';
import Button from './shared/components/UIElement/button';
import Input from './shared/components/UIElement/input';
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH,
  VALIDATOR_MAXLENGTH
} from './shared/ulti/validators'

const formReducer = (state, action) => {
  switch(action.type){
    case 'INPUT_CHANGE':
      const updatedData = {
        ...state.inputs,
          [action.id]: {value:action.value, isValid: action.isValid}
      };
      const formIsValid = Object.values(updatedData).every((input)=> input.isValid);
      return {
        inputs: updatedData,
        formIsValid,
      };
    case 'SET_DATA': 
      return {
        ...state,
        inputs: action.inputs,
        formIsValid: Object.values(action.inputs).every((input)=> input.isValid)
      }
    default: 
      return state
  }
} 
const App = () => {
  const [formState, dispatch] = useReducer(formReducer, {
    inputs:{
      fname:{value:'', isValid: false},
      mname:{value:'', isValid: false},
      lname:{value:'', isValid: false},
      email:{value:'', isValid: false},
      number:{value:'', isValid: false},
      discription:{value:'', isValid: false},
      address:{value:'', isValid: false},
      password:{value:'', isValid: false},
      c_password:{value:'', isValid: false}
    },
    formIsValid:false
  });

  const inputChangeHandler = useCallback((id, value, isValid)=>{
    dispatch({
      type:'INPUT_CHANGE',
      id,
      value,
      isValid
    })
  },[dispatch]);

  const { password, c_password } = formState.inputs;
  const passwordVerifier = (password.value === c_password.value);

  const formSubmitHandler = (e) => {
    e.preventDefault();
    if(passwordVerifier){
      if(formState.formIsValid){
        alert('Form Submitted, Thanks')
        console.log(formState)
        return
      }
    }
    alert('Invalid From Data!, Please try agian..')
  };

  return (
    <>
      <h1>Complex Form Handling</h1>
      <div className="App">
        <div className='form_con'>
          <form onSubmit={formSubmitHandler}>
            <div className='flex'>
              <Input 
                label='First Name:'
                element='input'
                id='fname'
                name='fname'
                type='text'
                value={formState.inputs.fname.value}
                validators={[VALIDATOR_REQUIRE()]}
                onInput={inputChangeHandler}
                errorText='Enter your first name'
              />
              <Input 
                label='Middle Name:'
                element='input'
                id='mname'
                name='mname'
                type='text'
                value={formState.inputs.mname.value}
                validators={[VALIDATOR_REQUIRE()]}
                onInput={inputChangeHandler}
                errorText='Enter you middle name'
              />
              <Input 
                label='Last Name:'
                element='input'
                id='lname'
                name='lname'
                type='text'
                value={formState.inputs.lname.value}
                validators={[VALIDATOR_REQUIRE()]}
                onInput={inputChangeHandler}
                errorText='Enter your last name'
              />
            </div>
            <div className='flex'>
              <Input 
                label='Email:'
                element='input'
                id='email'
                name='email'
                type='email'
                value={formState.inputs.email.value}
                validators={[VALIDATOR_REQUIRE(), VALIDATOR_EMAIL()]}
                onInput={inputChangeHandler}
                errorText='Enter a valid email'
              />
              <Input 
                label='Phone No.:'
                element='input'
                id='number'
                name='number'
                type='number'
                value={formState.inputs.number.value}
                validators={[VALIDATOR_REQUIRE(),VALIDATOR_MINLENGTH(10), VALIDATOR_MAXLENGTH(11)]}
                onInput={inputChangeHandler}
                errorText='Enter a valid phone number'
              />
            </div>
            <div className='flex'>
              <Input 
                label='Address:'
                element='input'
                id='address'
                name='address'
                type='text'
                value={formState.inputs.address.value}
                validators={[VALIDATOR_REQUIRE()]}
                onInput={inputChangeHandler}
                errorText='Enter your valid address'
              />
            </div>
            <div className='flex'>
              <Input 
                label='Discription:'
                element='textarea'
                id='discription'
                name='discription'
                value={formState.inputs.discription.value}
                validators={[VALIDATOR_REQUIRE(), VALIDATOR_MINLENGTH(12)]}
                onInput={inputChangeHandler}
                errorText='Enter a valid discription atleast 12 characters long'
              />
            </div>
            <div div className='flex'>
              <Input 
                label='Password:'
                element='input'
                id='password'
                name='password'
                type='password'
                value={formState.inputs.password.value}
                validators={[VALIDATOR_REQUIRE(), VALIDATOR_MINLENGTH(6)]}
                onInput={inputChangeHandler}
                errorText='Enter a password more than 6 characters long'
              />
              <Input 
                label='Confirm Password:'
                element='input'
                id='c_password'
                name='c_passowrd'
                type='password'
                value={formState.inputs.c_password.value}
                validators={[VALIDATOR_REQUIRE(), VALIDATOR_MINLENGTH(6)]}
                onInput={inputChangeHandler}
                errorText='Password does not match'
              />
            </div>
            <Button
              type='submit'
              id='submit'
              disabled={!formState.formIsValid}>
                SUBMIT
            </Button>
          </form>
        </div>
        <div className='form_output'>
          <h2>Hello world</h2>
        </div>
      </div>
    </>
  );
}

export default App;