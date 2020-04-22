// GLOBALS
// default form values
const defaultValues = {
  firstName: 'Captain',
  lastName: 'Obvious',
  address: '123 Address St.',
  city: 'City',
  zip: '01234',
  areaCode: '123',
  phoneNumber: '4567890',
  email1: 'name@domain.com',
  email2: 'name@domain.gov'
};

const form = document.getElementsByTagName('form')[0];
const names = extractInputElements('.names');
const address = extractInputElements('.address');
const state = document.getElementsByTagName('select')[0];
const contactInfo = extractInputElements('.contactInfo');
const meal = extractInputElements('.meal');
const submit = document.querySelector('#submitBtn');


// ONLOAD
// populate form with default values
(function() {
  // spread all inputs into one array
  const inputs = [ ...names, ...address, ...contactInfo ];
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
        // remove user feedback
        provideUserFeedback(name.name);
      }
    });

    // if valid, return true; else, return undefined
    if (inputsAreValid) return true;
  },


  validateAddress: () => {
    let inputIsValid = true;
    const addressInput = address.find(el => el.name === 'address');

    // if value is defaultValue or invalid
    if ( addressInput.value === defaultValues[addressInput.name] || !(/^[0-9A-Za-z \.\-]+$/.test(addressInput.value)) ) {
      // indicate as false
      inputIsValid = false;
      // provide user feedback
      provideUserFeedback(addressInput.name, 'Alphanumeric characters only');
    } else {
      // remove user feedback
      provideUserFeedback(addressInput.name);
    }

    // if valid, return true; else, return undefined
    if (inputIsValid) return true;
  },


  validateCity: () => {
    let inputIsValid = true;
    const cityInput = address.find(el => el.name === 'city');

    // if value is defaultValue or invalid
    if ( cityInput.value === defaultValues[cityInput.name] || !(/^[A-Za-z \-]+$/.test(cityInput.value)) ) {
      // indicate as false
      inputIsValid = false;
      // provide user feedback
      provideUserFeedback(cityInput.name, 'Alpha characters only');
    } else {
      // remove user feedback
      provideUserFeedback(cityInput.name);
    }

    // if valid, return true; else, return undefined
    if (inputIsValid) return true;
  },


  validateState: () => {
    let inputIsValid = true;

    if (state.value === '') {
      inputIsValid = false;
      provideUserFeedback(state.name, 'Selection required');
    } else {
      provideUserFeedback(state.name);
    }

    if (inputIsValid) return true;
  },


  validateZip: () => {
    let inputIsValid = true;
    const zipInput = address.find(el => el.name === 'zip');

    // if value is defaultValue or invalid
    if ( zipInput.value === defaultValues[zipInput.name] || !(/^[0-9]{5}$/.test(zipInput.value)) ) {
      // indicate as false
      inputIsValid = false;
      // provide user feedback
      provideUserFeedback(zipInput.name, 'Five numeric characters only');
    } else {
      // remove user feedback
      provideUserFeedback(zipInput.name);
    }

    // if valid, return true; else, return undefined
    if (inputIsValid) return true;
  },


  validateAreaCodeAndPhoneNumber: () => {
    let areaCodeIsValid = true;
    let phoneNumberIsValid = true;
    const inputs = [ contactInfo.find(el => el.name === 'areaCode'), contactInfo.find(el => el.name === 'phoneNumber') ];

    inputs.forEach(input => {
      if (input.name === 'areaCode') {
        // if value is defaultValue or invalid
        if ( input.value === defaultValues[input.name] || !(/^[0-9]{3}$/.test(input.value)) ) {
          // indicate as false
          areaCodeIsValid = false;
          // provide user feedback
          provideUserFeedback('phone', 'Numeric characters only: 123 4567890');
        }

      } else if (input.name === 'phoneNumber') {
        // if value is defaultValue or invalid
        if ( input.value === defaultValues[input.name] || !(/^[0-9]{7}$|^[0-9]{3}-[0-9]{4}$/.test(input.value)) ) {
          // indicate as false
          phoneNumberIsValid = false;
          // provide user feedback
          provideUserFeedback('phone', 'Numeric characters only: 123 4567890');
        }
      }
    });

    if (areaCodeIsValid && phoneNumberIsValid) {
      provideUserFeedback('phone');
      return true
    };
  },


  validateEmail1: () => {
    let inputIsValid = true;
    const email1 = contactInfo.find(el => el.name === 'email1');

    // if value is defaultValue or invalid
    if ( email1.value === defaultValues[email1.name] || !(/^[a-zA-Z0-9._%+-]{1,64}@[a-zA-Z0-9.-]{1,252}\.[a-zA-Z]{2,3}$/.test(email1.value)) ) {
      // indicate as false
      inputIsValid = false;
      // provide user feedback
      provideUserFeedback(email1.name, 'Invalid email address');
    } else {
      // remove user feedback
      provideUserFeedback(email1.name);
    }

    // if valid, return true; else, return undefined
    if (inputIsValid) return true;
  },


  validateEmail2: () => {
    let emailsAreEqual = true;
    const email1 = contactInfo.find(el => el.name === 'email1');
    const email2 = contactInfo.find(el => el.name === 'email2');

    // check if emails are equal
    if (email2.value !== email1.value) {
      // indicate as false
      emailsAreEqual = false;
      // provide user feedback
      provideUserFeedback(email2.name, 'Emails do not match');
    } else {
      provideUserFeedback(email2.name);
    }

    if (emailsAreEqual) return true;
  },


  validateMealPreference: () => {
    let mealPreferenceMade = false;

    meal.forEach(input => {
      if (input.checked) {
        mealPreferenceMade = true;
        provideUserFeedback('meal');
      }
    });

    if (mealPreferenceMade) {
      return true;
    } else {
      provideUserFeedback('meal', 'Please choose a meal preference');
    }
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