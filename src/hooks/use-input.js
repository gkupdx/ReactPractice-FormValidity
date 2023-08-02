// Custom "useInput()" hook
import { useState } from "react";

// expects to receive a "validateInput" FUNCTION
// that will hold the logic for validating a specific input type
const useInput = (validateInput) => {
  const [enteredInput, setEnteredInput] = useState("");
  const [isTouched, setIsTouched] = useState(false);
  // derived states:
  const inputIsValid = validateInput(enteredInput);
  const inputHasError = !inputIsValid && isTouched;

  const inputChangeHandler = (event) => {
    setEnteredInput(event.target.value);
  };

  const inputBlurHandler = (event) => {
    setIsTouched(true);
  };

  const reset = () => {
    setEnteredInput("");
    setIsTouched(false);
  };

  return {
    input: enteredInput,
    isValid: inputIsValid,
    error: inputHasError,
    inputChangeHandler,
    inputBlurHandler,
    reset
  };
};

export default useInput;
