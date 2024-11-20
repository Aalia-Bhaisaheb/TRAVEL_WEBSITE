document.addEventListener('DOMContentLoaded', function () {
  const showSignUpLink = document.getElementById('showSignUpLink');
  const showSignInLink = document.getElementById('showSignInLink');
  const signInForm = document.getElementById('signInForm');
  const signUpForm = document.getElementById('signUpForm');

  // Ensure the sign-up form starts hidden
  signUpForm.classList.add('d-none');

  showSignUpLink.addEventListener('click', function (e) {
    e.preventDefault();
    signInForm.classList.add('d-none');
    signUpForm.classList.remove('d-none');
  });

  showSignInLink.addEventListener('click', function (e) {
    e.preventDefault();
    signUpForm.classList.add('d-none');
    signInForm.classList.remove('d-none');
  });
});


document.addEventListener('DOMContentLoaded', function () {
  const passwordInput = document.getElementById('form2Example2_signup');
  const confirmPasswordInput = document.getElementById('form2Example2_confirm');
  const passwordHelp = document.getElementById('passwordHelp');

  // Regular expression for password validation: at least 8 characters, including one special character
  const passwordRegex = /^(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;

  // Show the message when the password input is focused
  passwordInput.addEventListener('focus', function () {
    passwordHelp.classList.remove('d-none');
    passwordHelp.classList.add('show');
  });

  // Function to validate password
  function validatePassword() {
    if (passwordRegex.test(passwordInput.value)) {
      passwordHelp.classList.add('d-none');
      passwordHelp.classList.remove('show');
      return true;
    } else {
      passwordHelp.classList.remove('d-none');
      passwordHelp.classList.add('show');
      return false;
    }
  }

  // Function to validate confirm password
  function validateConfirmPassword() {
    if (confirmPasswordInput.value === passwordInput.value) {
      return true;
    } else {
      return false;
    }
  }

  // Prevent moving to the confirm password block if the password is invalid
  passwordInput.addEventListener('blur', function (e) {
    if (!validatePassword()) {
      e.preventDefault();
      e.stopImmediatePropagation();
      passwordInput.focus(); // Keep focus on the password input
    }
  });

  // Prevent focus from moving to confirm password if the password is invalid
  confirmPasswordInput.addEventListener('focus', function (e) {
    if (!validatePassword()) {
      e.preventDefault();
      e.stopImmediatePropagation();
      passwordInput.focus(); // Keep focus on the password input
    }
  });

  // Validate confirm password when the user types in it
  confirmPasswordInput.addEventListener('input', function () {
    if (validateConfirmPassword()) {
      confirmPasswordInput.classList.remove('is-invalid');
    } else {
      confirmPasswordInput.classList.add('is-invalid');
    }
  });
});

document.addEventListener('DOMContentLoaded', function() {
  // Slider 1
  let next1 = document.querySelector('.home-popular-tours .slider-next');
  let prev1 = document.querySelector('.home-popular-tours .slider-prev');
  let slideContainer1 = document.querySelector('.home-popular-tours .slide-tour');

  function moveSlide1(direction) {
      let items1 = document.querySelectorAll('.home-popular-tours .item-tour');

      if (direction === 'next') {
          slideContainer1.appendChild(items1[0]); // Move the first item to the end
      } else if (direction === 'prev') {
          slideContainer1.prepend(items1[items1.length - 1]); // Move the last item to the beginning
      }
  }

  next1.addEventListener('click', function() {
      moveSlide1('next');
  });

  prev1.addEventListener('click', function() {
      moveSlide1('prev');
  });

  // Slider 2
  let next2 = document.querySelector('.home-popular-tours-duplicate .slider2-next');
  let prev2 = document.querySelector('.home-popular-tours-duplicate .slider2-prev');
  let slideContainer2 = document.querySelector('.home-popular-tours-duplicate .slide-tour');

  function moveSlide2(direction) {
      let items2 = document.querySelectorAll('.home-popular-tours-duplicate .item-tour');

      if (direction === 'next') {
          slideContainer2.appendChild(items2[0]); // Move the first item to the end
      } else if (direction === 'prev') {
          slideContainer2.prepend(items2[items2.length - 1]); // Move the last item to the beginning
      }
  }

  next2.addEventListener('click', function() {
      moveSlide2('next');
  });

  prev2.addEventListener('click', function() {
      moveSlide2('prev');
  });

  // Slider 3
  let next3 = document.querySelector('.home-popular-tours-duplicate2 .slider3-next');
  let prev3 = document.querySelector('.home-popular-tours-duplicate2 .slider3-prev');
  let slideContainer3 = document.querySelector('.home-popular-tours-duplicate2 .slide-tour');

  function moveSlide3(direction) {
      let items3 = document.querySelectorAll('.home-popular-tours-duplicate2 .item-tour');

      if (direction === 'next') {
          slideContainer3.appendChild(items3[0]); // Move the first item to the end
      } else if (direction === 'prev') {
          slideContainer3.prepend(items3[items3.length - 1]); // Move the last item to the beginning
      }
  }

  next3.addEventListener('click', function() {
      moveSlide3('next');
  });

  prev3.addEventListener('click', function() {
      moveSlide3('prev');
  });
});

    document.getElementById('loginFormElement').addEventListener('submit', function (event) {
        event.preventDefault(); // Prevent the default form submission

        // Get form data
        const email = document.querySelector('input[name="form2Example1_signin"]').value;
        const password = document.querySelector('input[name="form2Example2_signin"]').value;

        // Send login request to the server
        fetch('/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ form2Example1_signin: email, form2Example2_signin: password })
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                // Hide login form and show welcome message
                document.getElementById('loginForm').style.display = 'none';
                document.getElementById('welcomeMessage').style.display = 'block';
                document.getElementById('userName').textContent = data.user;  // Set the username
            } else {
                // Handle error (optional)
                alert(data.message);
            }
        })
        .catch(error => {
            console.error('Error during login:', error);
            alert('Something went wrong, please try again.');
        });
    });
