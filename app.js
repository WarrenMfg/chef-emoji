// UTILITY FUNCTIONS
function extractInputElements(className) {
  // query the argument
  const labels = document.querySelector(className);
  // query all inputs within argument; spread to make iterable
  return [...labels.querySelectorAll('input')];
}


// GLOBALS
// default form values
const defaultValues = {
  firstName: 'Captain',
  lastName: 'Obvious',

};

const names = extractInputElements('.names');
const form = document.getElementsByTagName('form')[0];
const submit = document.querySelector('#submitBtn');


// ONLOAD
// populate form with default values
(function() {
  names.forEach(name => name.value = defaultValues[name.name]);
})();


// EVENT HANDLERS
// event delegation: on focusin
form.addEventListener('focusin', (e) => {
  // if input value is default value
  if (e.target.value === defaultValues[e.target.name]) {
    // then remove default value
    e.target.value = '';
  }
});


// event delegation: on focusout
form.addEventListener('focusout', (e) => {
  // if nothing was entered in input
  if (e.target.value === '' && defaultValues[e.target.name]) {
    // replace default values
    e.target.value = defaultValues[e.target.name];
  }
});


// event delegation for .names (firstName, lastName): on change


// compare email addresses


// confirm at least two checkboxes are selected


/*
The Submit Button, when clicked, will display all of the errors on the form.
If errors exist on the form, the form data will not be e-mailed.
Once all errors have been removed AND all of the default text has been replaced,
data entered into the form will be transmitted via e-mail.
The Submit Button should call the submit () event handler function.

e-mail the result to your personal e-mail address.
*/
// SUBMIT
submit.addEventListener('click', (e) => {
  const inputsAreValid = validateForm();
  if (inputsAreValid) {
    form.submit();
  }
});

/*
The Reset Button will reset all of the fields on the form to a blank state.
The Reset Button should call the reset () event handler function.
*/