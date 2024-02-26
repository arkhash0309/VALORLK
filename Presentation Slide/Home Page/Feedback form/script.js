// the variables are declared by obtaining the elements by their ID in the HTML file
const form = document.getElementById("form");
const fname = document.getElementById("fname");
const lname = document.getElementById("lname");
const email = document.getElementById("email");
const rating = document.getElementById("rating");
const feedback = document.getElementById("feedback");

// an event listener is add for the submit button
form.addEventListener("submit", (e) => {
  e.preventDefault();
  
  // validateInputs method is executed on the first name, last name and the email
  const { firstName, lastName, emailName } = validateInputs();

  if (firstName && lastName && emailName) {
    // the popup is created by using the alert syntax
    window.alert(
      "Dear " +
        firstName +
        ", Thank you very much for your feedback. You have rated our site as " +
        rating.value +
        ", and your comment was " +
        feedback.value
    );
  }
});

// an error message is set in case the entry isn't valid
const setError = (element, message) => {
  // parentElement goes to the element which is wrapping the current element
  const inputControl = element.parentElement;
  // querySelector selects all the children elements of the parent element
  const errorDisplay = inputControl.querySelector(".error");

  errorDisplay.innerText = message;
  // the error message is added
  inputControl.classList.add("error");
  // the success message is removed
  inputControl.classList.remove("success");
};

// a success message is set in case the entry is valid
const setSuccess = (element) => {
  const inputControl = element.parentElement;
  const errorDisplay = inputControl.querySelector(".error");

  errorDisplay.innerText = "";
  // the success message is added
  inputControl.classList.add("success");
  // the error message is removed
  inputControl.classList.remove("error");
};

// check to validate if the email is correct
const isValidEmail = (email) => {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};

const validateInputs = () => {
  // the values are trimmed in case there are spaces
  const fnameValue = fname.value.trim();
  const emailValue = email.value.trim();
  const lnameValue = lname.value.trim();

  // the regex for checking for letters is created
  const lettersRegex = new RegExp(/^[a-zA-Z]+$/);

  // the first name, last name and the email is set as null
  let firstName = null;
  let lastName = null;
  let emailName = null;

  // the first name is validated to check if it contains only letters
  if (fnameValue === "") {
    setError(fname, "First name is required");
  } else if (!lettersRegex.test(fnameValue)) {
    setError(fname, "Invalid first name.");
  } else {
    setSuccess(fname);
    firstName = fnameValue;
  }

  // the email is validated to check if it follows the regex for email
  if (emailValue === "") {
    setError(email, "Email is required");
  } else if (!isValidEmail(emailValue)) {
    setError(email, "Provide a valid email address");
  } else {
    setSuccess(email);
    emailName = emailValue;
  }

  // the last name is validated to check if it contains only letters
  if (lnameValue === "") {
    setError(lname, "Last Name is required");
  } else if (!lettersRegex.test(lnameValue)) {
    setError(lname, "Invalid Last Name");
  } else {
    setSuccess(lname);
    lastName = lnameValue;
  }

  // the values of the first name, last name and the email are returned to provide the popup box
  return {
    firstName,
    lastName,
    emailName,
  };
};

