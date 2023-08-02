// SimpleInput component
import { useEffect, useState } from "react";
import useInput from "../hooks/use-input";

const SimpleInput = (props) => {
  /* 
    refer to the notes for Section #17, Video #233 
    on useState() vs useRef() for handling user input
    for the pros & cons of each.
  */
  const {
    input: enteredName,
    isValid: nameIsValid,
    error: nameHasError,
    inputChangeHandler: nameChangeHandler,
    inputBlurHandler: nameBlurHandler,
    reset: resetNameInput
  } = useInput((value) => value.trim() !== "");
  const {
    input: enteredEmail,
    isValid: emailIsValid,
    error: emailHasError,
    inputChangeHandler: emailChangeHandler,
    inputBlurHandler: emailBlurHandler,
    reset: resetEmailInput
  } = useInput((value) => value.includes("@"));

  const [formIsValid, setFormIsValid] = useState(false);

  /* 
    example of DERIVING a state from other states (e.g. from "enteredName"):
        const nameIsValid = enteredName.trim() !== "";
  */

  // using "useEffect()" to dynamically determine
  // the validity of the overall form
  useEffect(() => {
    if (nameIsValid && emailIsValid) {
      setFormIsValid(true);
    } else {
      setFormIsValid(false);
    }
  }, [nameIsValid, emailIsValid]);

  const formSubmissionHandler = (event) => {
    event.preventDefault();

    if (nameIsValid === false) return;

    console.log(enteredName);
    resetNameInput();
    resetEmailInput();

    // // with "useRef()", you have to DIRECTLY MANIPULATE the DOM
    // // to set or reset the input field value (NOT GOOD!)
    // // e.g. nameInputRef.current.value = "";
  };

  // dynamically storing different CSS classes
  const nameInputClasses = nameHasError
    ? "form-control invalid"
    : "form-control";
  const emailInputClasses = emailHasError
    ? "form-control invalid"
    : "form-control";

  return (
    <form onSubmit={formSubmissionHandler}>
      <div className={nameInputClasses}>
        <label htmlFor="name">Your Name</label>
        <input
          type="text"
          id="name"
          onChange={nameChangeHandler}
          onBlur={nameBlurHandler}
          value={enteredName}
        />
        {nameHasError && <p className="error-text">Name cannot be empty</p>}
      </div>
      <div className={emailInputClasses}>
        <label htmlFor="email">Your E-Mail</label>
        <input
          type="email"
          id="email"
          onChange={emailChangeHandler}
          onBlur={emailBlurHandler}
          value={enteredEmail}
        />
        {emailHasError && (
          <p className="error-text">Please enter a valid email</p>
        )}
      </div>
      <div className="form-actions">
        <button disabled={!formIsValid}>Submit</button>
      </div>
    </form>
  );
};

export default SimpleInput;
