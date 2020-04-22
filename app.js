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
const phoneDiv = document.querySelector('.contactInfo div');
const meal = extractInputElements('.meal');
const contactMethod = extractInputElements('.contactMethod');
const comments = document.getElementsByTagName('textarea')[0];
const submit = document.querySelector('#submitBtn');
const reset = document.querySelector('#resetBtn');


// ONLOAD
// populate form with default values
function populateFormWithDefaultValues() {
  // spread all inputs into one array
  const inputs = [ ...names, ...address, ...contactInfo ];
  // iterate to populate appropriate value
  inputs.forEach(input => input.value = defaultValues[input.name]);
}
populateFormWithDefaultValues();


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
        provideUserFeedback(name.name, '🤪 Alpha characters only');
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
      provideUserFeedback(addressInput.name, '🤪 Alphanumeric characters only');
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
      provideUserFeedback(cityInput.name, '🤪 Alpha characters only');
    } else {
      // remove user feedback
      provideUserFeedback(cityInput.name);
    }

    // if valid, return true; else, return undefined
    if (inputIsValid) return true;
  },


  validateState: () => {
    let inputIsValid = true;

    // if no selection is made
    if (state.value === '') {
      // indicate as such
      inputIsValid = false;
      // provide user feedback
      provideUserFeedback(state.name, '🤪 Selection required');
    } else {
      // otherwise, remove user feedback
      provideUserFeedback(state.name);
    }

    // if valid, return true; else, return undefined
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
      provideUserFeedback(zipInput.name, '🤪 Five numeric characters only');
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
          provideUserFeedback('phone', '🤪 Numeric characters only: 123 4567890');
        }

      } else if (input.name === 'phoneNumber') {
        // if value is defaultValue or invalid
        if ( input.value === defaultValues[input.name] || !(/^[0-9]{7}$|^[0-9]{3}-[0-9]{4}$/.test(input.value)) ) {
          // indicate as false
          phoneNumberIsValid = false;
          // provide user feedback
          provideUserFeedback('phone', '🤪 Numeric characters only: 123 4567890');
        }
      }
    });

    if (areaCodeIsValid && phoneNumberIsValid) {
      // remove user feedback
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
      provideUserFeedback(email1.name, '🤪 Invalid email address');
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
      provideUserFeedback(email2.name, '🤪 Emails do not match');
    } else {
      // remove user feedback
      provideUserFeedback(email2.name);
    }

    // if equal, return true; else, return undefined
    if (emailsAreEqual) return true;
  },


  validateMealPreference: () => {
    let mealPreferenceMade = false;

    // iterate over meal radio buttons
    meal.forEach(input => {
      // if one is checked
      if (input.checked) {
        // indicate as true
        mealPreferenceMade = true;
        // remove user feedback
        provideUserFeedback('meal');
      }
    });

    // if preference selected, return true
    if (mealPreferenceMade) {
      return true;
    } else {
      // else provide user feedback
      provideUserFeedback('meal', '🤪 Please choose a meal preference');
    }
  },


  validateContactMethod: () => {
    let contactMethodsChecked = 0;

    // iterate over contact method checkboxes
    contactMethod.forEach(input => {
      // if one is checked
      if (input.checked) {
        // count it
        contactMethodsChecked++;
      }
    });

    // if count is adequate
    if (contactMethodsChecked >= 2) {
      // remove user feedback
      provideUserFeedback('contactMethod');
      return true;
    } else {
      // otherwise, provide user feedback
      provideUserFeedback('contactMethod', '🤪 Please choose at least two contact methods');
    }
  },


  validateComments: () => {
    if (comments.value.length <= 250) {
      return true;
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


// EVENT LISTENERS
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

// phone accessibility (click on 'phone' label/div to focus on area code input)
phoneDiv.addEventListener('click', (e) => {
  // if click is div or label
  if (e.target.tagName === 'DIV' || e.target.tagName === 'LABEL') {
    // focus on area code input
    phoneDiv.querySelector('input[name="areaCode"]').focus();
  }
});

// track comment box input length; trigger error when above max
comments.addEventListener('input', handleCommentsTextarea);
function handleCommentsTextarea() {
  const length = comments.value.length;

  if (length <= 250) {
    const comments = document.getElementById('comments');
    // remove user feedback
    comments.removeAttribute('class');
    comments.innerText = `${250 - length} characters remaining`;
  } else {
    // provide user feedback
    provideUserFeedback('comments', '🤪 250 characters or fewer please');
  }
}

// listen for submit
submit.addEventListener('click', () => {
  // validate first
  const inputsAreValid = validateForm();
  // only if valid, then submit
  if (inputsAreValid) {
    form.submit();
    resetForm();
  }
});

// listen for reset
reset.addEventListener('click', resetForm);
function resetForm() {
  form.reset();
  populateFormWithDefaultValues();
  document.querySelectorAll('p').forEach(para => provideUserFeedback(para.id));
  handleCommentsTextarea();
}