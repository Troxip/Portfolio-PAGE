//IDS
const form = document.getElementById("form");
const username = document.getElementById("username");
const email = document.getElementById("email");
const password = document.getElementById("password");
const password2 = document.getElementById("password2");

//Show input error message
function showError(input, message) {
  const formControl = input.parentElement;
  formControl.className = "form-control error";
  const errorText = formControl.querySelector("small");
  errorText.innerText = message;
}

//Show input Success
function showSuccess(input) {
  const formControl = input.parentElement;
  formControl.className = "form-control success";
}

function checkEmail(input) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (re.test(input.value.trim())) {
    showSuccess(input);
  } else {
    showError(input, "Email is not valid");
  }
}

//Check required fields
function checkRequired(inputArr) {
  inputArr.map((input) => {
    input.value === ""
      ? showError(input, `${getFieldName(input)} is required`)
      : showSuccess(input);
  });
}

// Check Passwords Match
function checkPasswordMatch(input1, input2) {
  if (input1.value === input2.value) {
    showSuccess(input2);
  } else {
    showError(input2, "Passwords do not match");
  }
}

//Check Input Length
function checkLength(type, min, max) {
  if (type.value.length < min) {
    showError(type, `${getFieldName(type)} must be at least ${min} characters`);
  } else if (type.value.length > max) {
    showError(
      type,
      `${getFieldName(type)} must be less than ${max} characters`
    );
  }
}

//Get Field Name
function getFieldName(input) {
  return input.id[0].toUpperCase() + input.id.slice(1);
}

//Event Listeners
form.addEventListener("submit", (e) => {
  e.preventDefault();

  checkRequired([username, email, password, password2]);
  checkLength(username, 3, 15);
  checkLength(password, 6, 25);
  checkEmail(email);
  checkPasswordMatch(password, password2);
});
