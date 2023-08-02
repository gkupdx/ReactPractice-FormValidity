// BasicForm component
import useInput from "../hooks/use-input";

const BasicForm = (props) => {
  const {
    input: firstNameInput,
    isValid: firstNameValid,
    error: firstNameError,
    inputChangeHandler: firstNameChangeHandler,
    inputBlurHandler: firstNameBlurHandler,
    reset: resetFirstName
  } = useInput((value) => value.trim() !== "");
  const {
    input: lastNameInput,
    isValid: lastNameValid,
    error: lastNameError,
    inputChangeHandler: lastNameChangeHandler,
    inputBlurHandler: lastNameBlurHandler,
    reset: resetLastName
  } = useInput((value) => value.trim() !== "");
  const {
    input: emailInput,
    isValid: emailValid,
    error: emailError,
    inputChangeHandler: emailChangeHandler,
    inputBlurHandler: emailBlurHandler,
    reset: resetEmail
  } = useInput((value) => value.includes("@"));

  // checking overall form validity
  let formIsValid = false;
  if (firstNameValid && lastNameValid && emailValid) formIsValid = true;

  // form submission handler
  const onSubmitHandler = (event) => {
    event.preventDefault();

    if (!formIsValid) return;

    console.log("Submitted!");
    console.log(firstNameInput, lastNameInput, emailInput);
    resetFirstName();
    resetLastName();
    resetEmail();
  };

  // dynamically storing different CSS classes
  const firstNameClasses = firstNameError
    ? "form-control invalid"
    : "form-control";
  const lastNameClasses = lastNameError
    ? "form-control invalid"
    : "form-control";
  const emailClasses = emailError ? "form-control invalid" : "form-control";

  return (
    <form onSubmit={onSubmitHandler}>
      <div className="control-group">
        <div className={firstNameClasses}>
          <label htmlFor="name">First Name</label>
          <input
            value={firstNameInput}
            type="text"
            id="name"
            onChange={firstNameChangeHandler}
            onBlur={firstNameBlurHandler}
          />
          {firstNameError && (
            <p className="error-text">Please enter a first name</p>
          )}
        </div>
        <div className={lastNameClasses}>
          <label htmlFor="name">Last Name</label>
          <input
            value={lastNameInput}
            type="text"
            id="name"
            onChange={lastNameChangeHandler}
            onBlur={lastNameBlurHandler}
          />
          {lastNameError && (
            <p className="error-text">Please enter a last name</p>
          )}
        </div>
      </div>
      <div className={emailClasses}>
        <label htmlFor="name">E-Mail Address</label>
        <input
          value={emailInput}
          type="text"
          id="name"
          onChange={emailChangeHandler}
          onBlur={emailBlurHandler}
        />
        {emailError && <p className="error-text">Please enter a valid email</p>}
      </div>
      <div className="form-actions">
        <button disabled={!formIsValid}>Submit</button>
      </div>
    </form>
  );
};

export default BasicForm;
