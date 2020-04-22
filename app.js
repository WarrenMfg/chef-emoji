// GLOBALS
// default form values
const defaultValues = {
  firstName: 'Captain',
  lastName: 'Obvious',
  address: '123 Address St.',
  city: 'City',
  zip: '000000'
};

const names = extractInputElements('.names');
const address = extractInputElements('.address');
const form = document.getElementsByTagName('form')[0];
const submit = document.querySelector('#submitBtn');


// ONLOAD
// populate form with default values
(function() {
  // spread all inputs into one array
  const inputs = [ ...names, ...address ];
  // iterate to populate appropriate value
  inputs.forEach(input => input.value = defaultValues[input.name]);
})();


// UTILITY FUNCTIONS
function extractInputElements(className) {
  // query the argument
  const labels = document.querySelector(className);
  // query all inputs within argument; spread to make iterable
  return [...labels.querySelectorAll('input')];
}


function provideUserFeedback(id, userFeedback) {
  const element = document.getElementById(id);
  // if feedback is needed
  if (userFeedback) {
    // give user feedback
    element.innerText = userFeedback;
    // add color coordination
    element.className = 'invalid';
  } else {
    // otherwise, replace user feedback with &nbsp;
    element.innerText = '\u00a0';
    // and remove color coordination
    element.className = '';
  }
}


const validateFuncs = {
  validateNames: () => {
    let inputsAreValid = true;

    // iterate over name inputs
    names.forEach(name => {
      // if value is defaultValue or invalid
      if ( name.value === defaultValues[name.name] || !(/^[A-Za-z\-]+$/.test(name.value)) ) {
        // indicate as false
        inputsAreValid = false;
        // provide user feedback
        provideUserFeedback(name.name, 'Alpha characters only');
      } else {
        provideUserFeedback(name.name);
      }
    });

    // if valid, return true; else, return undefined
    if (inputsAreValid) return true;
  },


  validateAddress: () => {
    let inputsAreValid = true;
    const addressInput = address.find(el => el.name === 'address');

    // if value is defaultValue or invalid
    if ( addressInput.value === defaultValues[addressInput.name] || !(/^[0-9A-Za-z \.\-]+$/.test(addressInput.value)) ) {
      // indicate as false
      inputsAreValid = false;
      // provide user feedback
      provideUserFeedback(addressInput.name, 'Alphanumeric characters only');
    } else {
      provideUserFeedback(addressInput.name);
    }

    // if valid, return true; else, return undefined
    if (inputsAreValid) return true;
  }
};


function validateForm() {
  let inputsAreValid = true;

  // iterate over all validation functions
  for (let [key, func] of Object.entries(validateFuncs)) {
    // invoke each function and if false is returned toggle inputsAreValid to false
    func() ? null : inputsAreValid = false;
  }

  // only if still true, then return true, else return undefined
  if (inputsAreValid) {
    return true;
  }
}


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