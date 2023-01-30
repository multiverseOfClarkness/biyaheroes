const email = document.getElementById('email');
const password = document.getElementById('password');
const form = document.getElementById('form');
const login_btn = document.getElementById('login');
const forgot_pass_btn = document.getElementById('forgot-pass-btn');
const errorTxt = document.getElementById('error-msg')



const mask = document.getElementById('page-mask');
const popups = document.getElementsByClassName('popup-box');
const forgot_pass_popup = document.getElementById('forgot-pass-popup');


function inputValidation() {
    
    let emailVal = email.value.trim();
    let passVal = password.value.trim();
    let valid = true

    if(emailVal === '') {
        errorMsg(email, 'Email cannot be empty.');
        return valid = false;
    } successMsg(email);
    

    if(passVal === '') {
        errorMsg(password, 'Password cannot be empty.');
        return valid = false;
    }  successMsg(password);
    
}

function errorMsg(input, msg) {
    const formItem = input.parentElement;
    const small = formItem.querySelector('small');
    
    small.innerHTML = msg;
    input.className = 'form-control error';
}

function successMsg(input) {
    input.className = 'form-control success';
}

function ForgotPass() {
    forgot_pass_popup.style.display = 'block';
    mask.style.visibility = 'visible';

    const x_btns = document.getElementsByClassName('close');

    for(var x of x_btns) {
      x.addEventListener('click', ClosePopup);
    }
}

function ClosePopup() {
    mask.style.visibility = 'hidden';

    const inputs = document.getElementsByClassName('form-control');

    for(var input of inputs) {
      const err = input.classList.contains('error');
      const success = input.classList.contains('success');

      if(err === true) {
        input.classList.remove('error');
      }

      if(success === true) {
        input.classList.remove('success');
      }
    }

    for(var popup of popups) {
      popup.style.display = 'none';
    }
}

forgot_pass_btn.addEventListener('click', ForgotPass);